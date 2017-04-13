// BarrettMu, a class for performing Barrett modular reduction computations in
// JavaScript.
//
// Requires BigInt.js.
//
// Copyright 2004-2005 David Shapiro.
//
// You may use, re-use, abuse, copy, and modify this code to your liking, but
// please keep this header.
//
// Thanks!
//
// Dave Shapiro
// dave@ohdave.com
import big from './BigInt';

function BarrettMu_modulo(x) {
	let q1 = big.biDivideByRadixPower(x, this.k - 1);
	let q2 = big.biMultiply(q1, this.mu);
	let q3 = big.biDivideByRadixPower(q2, this.k + 1);
	let r1 = big.biModuloByRadixPower(x, this.k + 1);
	let r2term = big.biMultiply(q3, this.modulus);
	let r2 = big.biModuloByRadixPower(r2term, this.k + 1);
	let r = big.biSubtract(r1, r2);
	if (r.isNeg) {
		r = big.biAdd(r, this.bkplus1);
	}
	let rgtem = big.biCompare(r, this.modulus) >= 0;
	while (rgtem) {
		r = big.biSubtract(r, this.modulus);
		rgtem = big.biCompare(r, this.modulus) >= 0;
	}
	return r;
};

function BarrettMu_multiplyMod(x, y) {
	/*
	x = this.modulo(x);
	y = this.modulo(y);
	*/
	let xy = big.biMultiply(x, y);
	return this.modulo(xy);
};

function BarrettMu_powMod(x, y){
	let result = new big.BigInt();
	result.digits[0] = 1;
	let a = x;
	let k = y;
	while (true) {
		if ((k.digits[0] & 1) != 0) result = this.multiplyMod(result, a);
		k = big.biShiftRight(k, 1);
		if (k.digits[0] == 0 && big.biHighIndex(k) == 0) break;
		a = this.multiplyMod(a, a);
	}
	return result;
};
function  BarrettMu(m){
	this.modulus = big.biCopy(m);
	this.k = big.biHighIndex(this.modulus) + 1;
	let b2k = new big.BigInt();
	b2k.digits[2 * this.k] = 1; // b2k = b^(2k)
	this.mu = big.biDivide(b2k, this.modulus);
	this.bkplus1 = new big.BigInt();
	this.bkplus1.digits[this.k + 1] = 1; // bkplus1 = b^(k+1)
	this.modulo = BarrettMu_modulo;
	this.multiplyMod = BarrettMu_multiplyMod;
	this.powMod = BarrettMu_powMod;
};
const  Barrett = {
	BarrettMu:BarrettMu,
	BarrettMu_modulo:BarrettMu_modulo,
	BarrettMu_multiplyMod:BarrettMu_multiplyMod,
	BarrettMu_powMod:BarrettMu_powMod
}

module.exports =  Barrett;
