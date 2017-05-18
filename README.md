# SMVTimeLine
SMVTimeLine移动端水平拖拽时间轴，依赖Jquery，有问题请发邮件：sm0210@qq.com

##实例化SMVTimeLine拖拽时间轴

````
vtimelineObj = $('#vtimeline').initSMVTimeLine({
	//必须参数: 数据集
	data: data,
	//可配置参数: 一天偏移基础值,[默认0.42根据天来计算，使用时根据实际情况设置,不要设置太大]
	//baseValue: 0.9,
	//可配置参数: 时间字段，默认time
	//timeField: 'time',
	//可配置参数: 时间展示字段,默认:timeTitle
	//timeTitleField: 'timeTitle',
	//可配置参数: 描述字段，默认:desc
	//descField: 'desc',
	//可配置参数: 类型字段，默认:type
	//typeField: 'type',
	//监听点击事件
	onClick: vtimelineClick
}); 
 ````
 
 ##自定义监听事件
 ````
 function vtimelineClick(data){
	//
	if(data){
		console.log(data);	
	}
}
 ````
 
 ##重新渲染时间轴
````
	vtimelineObj.reload(data);
 ````
 
 ##获取时间轴数据
 
 ````
 	vtimelineObj.getData();
 ````
 
 ###如果您觉得此文有帮助，可以打赏点钱给我支付宝sm0210@qq.com ，或扫描二维码
![](https://github.com/sm0210/SMCalendar/blob/master/sm0210%40qq.com.jpg "sm0210@qq.com")
