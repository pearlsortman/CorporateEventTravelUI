;(function(){

	function getData( element, datalabel ){
		var returnobject = {};
		if( isDataSetSupported ){
			if( datalabel !== undefined ){
				return element.dataset[ datalabel ];
			} else {
				returnobject = element.dataset;
			}
		} else {
			if( datalabel !== undefined ){
				return element.readAttribute( "data-" + datalabel );
			} else {
				var label = "",
					numberattributes = element.attributes.length
				;
				
				for( var t = 0; t < numberattributes ; t++ ){
					if( element.attributes[ t ].name.match(/^data-.+/) ){
						label = element.attributes[ t ].name.replace(/^data-/,'').camelize();
						returnobject[ label ] = element.attributes[ t ].value;
					}
				}
			}
		}
		return returnobject;
	}
	
	function setData( element, datalabel, value ){
		if( typeof value !== undefined ){
			
			if( isDataSetSupported ){
				element.dataset[ datalabel.camelize() ] = value;
			}
			
			element.writeAttribute( "data-"+datalabel.underscore().dasherize(), value );
		} else {
			delete element.dataset[ datalabel.camelize() ];
			element.writeAttribute( "data-"+datalabel.underscore().dasherize(), null );
		}
	}
	
	var isDataSetSupported = (function(){
		var test = new Element( "input", { "data-test-dummy" : "test" } );
			
		if( typeof test.dataset !== 'undefined' && typeof test.dataset.testDummy !== 'undefined' ){
			return true;
		} 
			
		return false;		
	})();
	
	Element.addMethods({
		data: function(){
			var args = arguments;
			switch ( args.length ){
				case 3:
					setData.apply( this, args );
					break;
				default:
					return getData.apply( this, args );
			}
		}
	});
	
})();
