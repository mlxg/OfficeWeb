<template>
  <ol class="crumb">
      <li><i>Home</i></li>
      <li class="active">{{tName}}</li>
  </ol>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {},
  ready() {},
  attached() {},
  methods: {},
  components: {},
  props: ['tName']
};
</script>

<style lang="css">
.crumb {
  height: 30px;
  margin-bottom: 10px;
  padding: 0;
  list-style: none;
  border-radius: 4px;
  background-color: #eef7ff;
  font-size: 14px;
  line-height: 30px;
}
.crumb > li{
  position: relative;
  display: inline-block;
  padding-right: 20px;
  padding-left: 10px;
}
.crumb> li:first-child > i {
    display: block;
    width: 20px;
    text-indent: -999px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAARCAYAAADdRIy+AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAABmAAAAZgEHbzbCAAABc0lEQVQ4y63TsWtUQRDH8c+dR1AUxFK0sBcxsP+AhQQxKki0F4UxKSysxNbKxi4KGdFGVCQKBzG9BNsXgxY2ohY2WqUXiYUrPM/cPQz+YIqZnf3uzDDb06GImMIStnA1M79Pyu91wPZjGb8hA1xEYF8rdZiZG9CfADuMNXzEuWqfamwKm9XmMK314naw43iJu5l5u3U0HxE3sYDZzHwXESfad3dtA5vBENczc2n0vGma16WUb3haSnmDgvdN07z9q+WIuIxHmMvMZ+PGkZmP6yyfYAMv/qgwInqllFu4hpOZua5DTdN8LqWs4g52N02zBr26FvdxtM7laxdspKuDWMU65vt1+Acwo2ONxmir3j2ElT7u4TxOY3EHwEWcwhk8HGTmsJY+MGaNOjTAIDN/YHkiICKu4OxIeCUzH0yiT9IxfMHz6l+oMTsFwofMfFUrnsaRScn9bt6/6b8DR1uejYjNlr8HN0ZyFiLiUsvf69ffBz8B1WFwWZTiV9sAAAAASUVORK5CYII=);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
}
.crumb > li::before,.crumb > li::after{
  position: absolute;
  content: '';
  border-style: solid;
  border-top-color: transparent;
  border-right-width: 0;
  border-bottom-color: transparent;
}
.crumb > li::before{
  top: 1px;
  right: 0;
  border-top-width: 14px;
  border-right-color: #ddd;
  border-bottom-width: 14px;
  border-left-width: 12px;
  border-left-color: #ddd;
}
.crumb > li::after{
  top: 2px;
  right: 1px;
  border-top-width: 13px;
  border-right-color: #eef7ff;
  border-bottom-width: 13px;
  border-left-width: 11px;
  border-left-color: #eef7ff;
}
</style>
