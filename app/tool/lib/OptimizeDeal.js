/**
 * Created by girl on 16/9/5.
 */
/**
 * 防治冒泡的方发
 * @param e
 */
export  const stopPropagation=(e)=> {
    e = e || window.event;
    if(e.stopPropagation) { //W3C阻止冒泡方法
        e.stopPropagation();
    } else {
        e.cancelBubble = true; //IE阻止冒泡方法
    }

};
/**
 * 阻止js默认行为
 * @param e
 * @returns {boolean}
 */
export  const preventDefault=(e)=> {
    if ( e && e.preventDefault ){//阻止默认浏览器动作(W3C)
            e.preventDefault();
        } else { //IE中阻止函数器默认动作的方式
        window.event.returnValue = false;
    }
    return false;

};


export const contenteditableEnter= (e) =>{ // Enter focus deal
    const value= e.target.textContent;
    e.target.textContent = value.trim();
    e.target.contentEditable = false;
    setTimeout(()=>e.target.contentEditable = true,10);
    return value;
}
