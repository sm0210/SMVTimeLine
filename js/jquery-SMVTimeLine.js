/*
	@author:SM
	@e-mail:sm0210@qq.com
	@desc:SMVTimeLine 移动端水平拖拽滚动条
	@version:SMVTimeLine 0.1
	
*	实现思路：
*	  1.统一转成最低天数计算
*			天 = 天(day)
*	    	月 = * 30(month)
*	    	年 = * 12 * 30(year)
*	  2.节点偏移计算公式：(每个节点总天数 - 最小天数) * 一天所占偏移量(0.42)
*/
(function($){
	//
	$.fn.initSMVTimeLine=function(options){
		//参数
		var s = $.extend({}, defaults, options || {});//
		//contentEl
		var SMCalendarId = $(this).attr('id');
		//
		if(!SMCalendarId){
			return;
		}
		//el
		var smCalendarEl = $('#'+SMCalendarId);
		/*
			在数组中获取偏移量
		*/
		s.extractData = function(){
			//遍历
			//
			s._result = [];
			//
			$.grep(s.data, function(record, index){
				//
				var type = record[s.typeField] || 'day';
				//
				var timeDate = record[s.timeField] || 0;
				//
				s._result.push(type === 'year' ? timeDate * s.yearDateVlue : type === 'month' ? timeDate * s.monthDateValue : timeDate);
			});
			//获取最小值
			s.minValue = Math.min.apply(null, s._result);
		},
		/**
			实例化SMVTimeLine
		*/
		s.initSMVTimeLine = function(){
			//操作数据
			s.extractData();
			//
			var htmlTpl = s.tplContent[0];
			
			//
			$.grep(s.data, function(record, index){
				//计算偏移距离
				var leftVal = s.calculatedDistance(index);
				//
				htmlTpl += '<li>';
					htmlTpl += '<div class="vtimeline-note-div" style="left: '+leftVal+'px">';
						htmlTpl += '<span class="vtimeline-note-cicle" data-desc="'+(record[s.descField] || "")+'" data-index="'+index+'" id="'+SMCalendarId+'-vtimeline-note-cicle-'+index+'"></span>';
						htmlTpl += '<span class="vtimeline-note">'+(record[s.timeTitleField] || "")+'</span>';
					htmlTpl += '</div>';
				htmlTpl += '</li>';
			});
			//			
			htmlTpl += s.tplContent[1];
			//渲染dom
			smCalendarEl.html(htmlTpl);
			//绑定事件
			smCalendarEl.find('.vtimeline-note-cicle').on('click', s.vtimelineNoteCicleClick);
		},
		/*
			重新渲染
		*/
		s.reload = function(data){
			//
			if($.isArray(data)) {
				s.data = data;
				//重新渲染
				s.initSMVTimeLine();
			}
		},
		/*
			获取data
		*/
		s.getData = function(){
			return s.data;
		},
		/*
			计算偏移距离
		*/
		s.calculatedDistance = function(index){
			//当前值
			var currendNum = s._result[index];
			//计算出的偏移值
			var currentLeft = (currendNum - s.minValue) * s.baseValue;
			//返回
			return currentLeft;
		},
		/**
			SMVTimeLine圆点位置和点击事件
		*/
		s.vtimelineNoteCicleClick = function(e){
			//当前圆点事件
			var el = $(e.target);
			//隐藏所有title
			smCalendarEl.find('.vtimeline-note-title').css('visibility', 'hidden');
			//获取index
			var index = el.attr('data-index');
			//隐藏所有被选中圆点
			smCalendarEl.find('.vtimeline-note-div .vtimeline-note-cicle').removeClass('vtimeline-note-cicle-active');
			//当前节点添加被选中
			el.addClass('vtimeline-note-cicle-active');
			//当前值left
			var leftVal  = el.offset().left;
			//当前标题
			var vtimeTitle = smCalendarEl.find('.vtimeline-note-title');
			//当前描述
			var desc = el.attr('data-desc');
			//设置悬浮提示值
			vtimeTitle.html(desc);
			//悬浮提示一半宽度
			var vtimeTitleWidthHalf = vtimeTitle.width() / 2;
			//设置悬浮显示位置
			var setVal = (leftVal - vtimeTitleWidthHalf - s.tipGapValue) + smCalendarEl.scrollLeft();
			//判断是否超出屏幕宽度
			if(leftVal + vtimeTitleWidthHalf > smCalendarEl.width()){
				//
				setVal = setVal -  vtimeTitleWidthHalf + 20;
			}
			//判断是否有被盖住的文字
			if(vtimeTitleWidthHalf > setVal + s.tipGapValue && setVal + s.tipGapValue < 0) {
				//
				setVal = setVal +  vtimeTitleWidthHalf;
			}
			//设置
			vtimeTitle.css({'left': setVal+'px' , 'visibility' : 'visible'});
			//是否监听事件
			if(typeof s.onClick === "function") {
				//抛出事件
				var data = {};
				//
				if(index){
					data = s.data[index];
				}
				//
				s.onClick.call(this, data);
				
			}
		}
		//end fun
		//实例化SMVTimeLine
		s.initSMVTimeLine();
		//
		return s;
	};
	/*
		初始化参数
	*/
	var defaults ={
		//必须参考: 数据集
		data: [],
		//公共模板内容
		tplContent: [
			'<div class="vtimeline-left"><span>时间</span></div>'+
			'<div class="vtimeline-right">'+
				'<div class="vtimeline-note-title"></div>'+
					'<ul>',
					'</ul>'+
			'</div>'
			
		],
		//一天偏移基础值
		baseValue: 0.42,
		//悬浮差距值
		tipGapValue: 63,
		//月转换天数
		monthDateValue: 30,
		//年转换天数
		yearDateVlue: 12 * 30,
		//时间字段
		timeField: 'time',
		//时间展示字段
		timeTitleField: 'timeTitle',
		//描述字段
		descField: 'desc',
		//类型字段
		typeField: 'type',
		//私有属性根据data计算每个节点偏移量的值
		_result: [],
		//最小值
		minValue: 0
	};	
})(jQuery);
