
        var t = this, m = Math;        
        var vec2 = function(x,y){
       	 return {
        		x:x,
    	    	y:y
	        	};        
        };        
        
     	var uv = new vec2(v[0]*4.,v[1]*4.);
         
               
        var i0 = 1.2;
        var i1 = 1.95;
        
        var i2 = 0.5;
        
        var i4 = new vec2(0,0);
        
        t = .7;
        
        for(var s=0;s<5;s++)
		{
        
        	var r = new vec2(0,0);          
           
        	r.x = m.cos(uv.y*i0-i4.y+t/i1) /i2;
           	
            r.y = m.sin(uv.x*i0-i4.y+t/i2) /i2;
            
            r.x += -r.x * 0.5;
			r.y += r.x * 0.5;
		
            
            uv.x += r.x;
            uv.y += r.y;
          
            
          
            r.x += r.y*0.2;
            r.y += r.x*.2;
            
            
            i0*=1.93;
			i1*=1.25;
			i2*=1.7;
		
        	i4.x +=r.x*1.0+0.5*t*i1;
            i4.y +=r.y*1.0+0.5*t*i1;
            
        }
        
        
        var r=m.sin(uv.x-t)*0.5+0.5;
		var b=m.sin(uv.y+t)*0.5+0.5;
        var g=m.sin((m.sqrt(uv.x*uv.x+uv.y*uv.y)+t))*0.5+0.5;
        
        return [Math.abs((r)*255),Math.abs((g)*255),Math.abs((b)*255)];  
         
        
        
             