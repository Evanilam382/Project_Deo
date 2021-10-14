var pathFinding = {
	scale : 1,
	nodeSize : 4,
	init: function(opts) {
		this.width = opts.width;
		this.height = opts.height;
		this.startKoordX;
		this.startKoordY;
		this.endKoordX;
		this.endKoordY;
		this.numCols = 230;
		this.numRows = 130;
		this.seObjWidth = 36;
		this.seObjHeight = 62;
		this.zoomFlag = 0;
		this.zoomCounter = 1;
		this.paths = [];
		this.repo = [];
		that = this;
		
		this.app = new PIXI.Application(this.width, this.height, {backgroundColor : 0xffffff});
		document.getElementById("proj-map-container").appendChild(this.app.view);
		
		this.elementContainer = new PIXI.Container();
		this.titleContainer = new PIXI.Container();
		this.endPosContainer = new PIXI.Container();
		
        this.viewportInit();
        this.viewportEvent();
        this.viewport.addChild(this.elementContainer);
        this.app.stage.addChild(this.titleContainer);
		
		this.easystar = new EasyStar.js();
		this.easystar.setAcceptableTiles([1]);
		this.easystar.enableDiagonals();
		this.easystar.setIterationsPerCalculation(10000);
    },
    createMap : function(image) {
		var map = PIXI.Sprite.fromImage(image);
		map.x = 0;
		map.y = 0;
		map.width = this.numCols*this.nodeSize;
		map.height = this.numRows*this.nodeSize;
		this.elementContainer.addChild(map);
    },
    setStartPos : function(koordX,koordY) {
		this.startKoordX = koordX;
		this.startKoordY = koordY;
		
		var startObj = PIXI.Sprite.fromImage(base_url+'html-ekiosk/public/media/map-startpos.png');
		startObj.anchor.set(0.5);
		startObj.width = this.seObjWidth;
		startObj.height = this.seObjHeight;
		startObj.x = koordX * this.nodeSize + (this.nodeSize / 2);
		startObj.y = koordY * this.nodeSize - (this.seObjHeight / 2) + 4 + (this.nodeSize / 2);
		this.elementContainer.addChild(startObj);
    },
    setEndPos : function(koordX,koordY,image) {
		this.endKoordX = koordX;
		this.endKoordY = koordY;
		
		var endObj = PIXI.Sprite.fromImage(base_url+'html-ekiosk/public/media/map-endpos.png');
		endObj.anchor.set(0.5);
		endObj.width = this.seObjWidth;
		endObj.height = this.seObjHeight;
		endObj.x = koordX * this.nodeSize + (this.nodeSize / 2);
		endObj.y = koordY * this.nodeSize - (this.seObjHeight / 2) + 4 + (this.nodeSize / 2);
		this.endPosContainer.addChildAt(endObj,0);
		var container = new PIXI.Container();
		
		var tenantLogo = PIXI.Sprite.fromImage(image);
		tenantLogo.width = 24;
		tenantLogo.height = 24;
		tenantLogo.x = 0;
		tenantLogo.y = 0;
		container.addChild(tenantLogo);
		
		container.pivot.x = container.width / 2;
		container.pivot.y = container.height / 2;
		container.x = koordX * this.nodeSize + (this.nodeSize / 2);
		container.y = koordY * this.nodeSize - (this.seObjHeight / 2) - 5 + (this.nodeSize / 2);
		
		var masking = new PIXI.Graphics();
		masking.beginFill(0xFFFFFF, 1);
		masking.drawCircle(12,12,12);
		container.mask = masking;
		
		container.addChild(tenantLogo);
		container.addChild(masking);
		
		this.endPosContainer.addChildAt(container,1);
		this.elementContainer.addChild(this.endPosContainer);
		this.zoomCounter = 0.5;
		this.viewportSnap(this.numCols * this.nodeSize * 0.5);
		this.viewport.moveCenter(this.calculate(koordX,0),this.calculate(koordY,0));
    },
    removeEndPos : function() {
    	this.endPosContainer.removeChildren();
        this.endPosContainer.removeChildren();
    },
	setTitle: function(text) {
		var style = new PIXI.TextStyle({
			fontFamily: 'gothamnarrow-book',
			fontSize: 14,
			fill: '#085490'
		});
		var titleText = new PIXI.Text(text,style);
		titleText.x = 20;
		titleText.y = 20;
		this.titleContainer.addChild(titleText);
	},
	showLegend: function(image,array,id) {
		legend = [];
		that = this;
		
		console.log(checkRepo(id))
		if(!checkRepo(id)) {
			addRepo();
		} else {
			removeRepo(id);
		}
		
		function addRepo() {
			for (var i = 0; i < array.length; i++) {
				legend[i] = PIXI.Sprite.fromImage(image);
				legend[i].width = 32;
				legend[i].height = 32;
				legend[i].x = array[i].x;
				legend[i].y = array[i].y;
				that.elementContainer.addChild(legend[i]);
				that.repo.push({id:id,obj:legend[i]});
			}
		}
		
		function removeRepo(id) {
			var flag = [];
			for (var i = 0; i < that.repo.length; i++) {
				if (that.repo[i].id == id) {
					flag.push(i);
					that.elementContainer.removeChild(that.repo[i].obj);
				}
			}
			for (var i = 0; i < flag.length; i++) {
				that.repo.splice(flag[0],1);
			}
		}
		
		function checkRepo(id) {
			for (var i = 0; i < that.repo.length; i++) {
				if (that.repo[i].id == id) {
					return true;
				}
			}
			return false;
		}
	},
	createGrid: function(grid) {
		this.easystar.setGrid(grid);
	},
    createRect : function(animateKoordX,animateKoordY,container,counter) {
    	var graphics = new PIXI.Graphics();
		graphics.beginFill(0xFF3300);
		if(counter % 2 == 0) {
			graphics.drawRect(animateKoordX * this.nodeSize, animateKoordY * this.nodeSize, this.nodeSize, this.nodeSize);
			container.addChild(graphics);
		}
		return graphics;
    },
    createPath : function(animateKoordX,animateKoordY,counter) {
		var path = {};
		path.rect = this.createRect(animateKoordX,animateKoordY,this.elementContainer,counter);
		this.paths.push(path);
    },
    destroyPath : function(animateKoordX,animateKoordY,counter) {
		for (var i = 0; i < this.paths.length; i++) {
			this.elementContainer.removeChild(this.paths[i].rect);
		}
		this.paths = [];
    },

	pathFindingStart: function() {
		that = this;
		this.flag = true;
		var counter = 0;
		this.easystar.findPath(this.startKoordX, this.startKoordY, this.endKoordX, this.endKoordY, function(path) {
			that.destroyPath();
			that.id = setInterval(function() {
				if(that.flag && path.length != 0) {
					counter++;
					
					that.createPath(path[0].x,path[0].y,counter);
					path.splice(0,1);
				}
				else {
					clearInterval(that.id);
				}
			},10);
		});
		this.easystar.setIterationsPerCalculation(100000);
		this.easystar.calculate();
	},
    pathFindingCustom: function(x,y,x1,y1) {
		that = this;
		this.flag = true;
		var counter = $("#counterPath").val();

		this.easystar.findPath(x, y, x1, y1, function(path) {
			that.destroyPath();
			that.id = setInterval(function() {
                console.log(counter);
				if(that.flag && path.length != 0) {
					newCounter = counter++;
                    $("#counterPath").val(newCounter);
					that.createPath(path[0].x,path[0].y,counter);
					path.splice(0,1);
				}
				else {
                  totalCounterPath = $("#counterPath").val();
                   // alert();
					clearInterval(that.id);
				}
			},10);
		});
		this.easystar.setIterationsPerCalculation(100000);
		this.easystar.calculate();
	},pathFindingCustom2: function(x,y,x1,y1,id) {
		that = this;
		this.flag = true;
		var counter = $("#exitPath_"+id).val();
		this.easystar.findPath(x, y, x1, y1, function(path) {
			that.destroyPath();
			that.id = setInterval(function() {

				if(that.flag && path.length != 0) {
					newCounter = counter++;
                    $("#exitPath_"+id).val(newCounter);
					that.createPath(path[0].x,path[0].y,counter);
					path.splice(0,1);
				}
				else {
                  totalCounterPath = $("#exitPath_"+id).val();
                   // alert();
					clearInterval(that.id);
				}
			},10);
		});
		this.easystar.setIterationsPerCalculation(100000);
		this.easystar.calculate();
	},
	destroyEverything: function() {
		this.app.destroy(true);
		this.app = null;
		this.flag = false;
	},
    viewportInit: function() {
		this.viewport = new PIXI.extras.Viewport({
		  screenWidth: this.width,
		  screenHeight: this.height,
		  worldWidth: this.numCols*this.nodeSize,
		  worldHeight: this.numRows*this.nodeSize,
		  interaction: this.app.renderer.interaction
		});
        this.app.stage.addChild(this.viewport);
        this.viewport
			.drag()
			.pinch()
			.decelerate()
			.bounce({
				time: 500
			})
		this.viewportSnap(this.numCols*this.nodeSize);
    },
    viewportEvent: function() {
		that = this;
        this.viewport.on('pinch-end', function(e) {
        	if(e.lastViewport.scaleX < (that.width / (that.numCols*that.nodeSize))) {
				that.viewportSnap(that.numCols*that.nodeSize);
        	} else if(e.lastViewport.scaleX > 4) {
				that.viewportSnap(that.numCols*that.nodeSize/4);
        	}
        });
    },
    viewportSnap: function(num) {
    	if (this.width > this.height) {
			this.viewport.snapZoom({ height: num, time: 500, removeOnComplete: true, interrupt: false });
		} else {
			this.viewport.snapZoom({ width: num, time: 500, removeOnComplete: true, interrupt: false });
		}
    },
    zoomIn: function() {
		if(this.zoomCounter > 0.25) {
			this.zoomCounter -= 0.25;
			console.log(this.zoomCounter)
			console.log(this.zoomCounter * this.width)
			this.viewport.snapZoom({ width: this.zoomCounter * this.numCols * this.nodeSize, time: 500, removeOnComplete: true, interrupt: false });
		}
    },
    zoomOut: function() {
		if(this.zoomCounter < 1) {
			this.zoomCounter += 0.25;
			console.log(this.zoomCounter)
			console.log(this.zoomCounter * this.width)
			this.viewport.snapZoom({ width: this.zoomCounter * this.numCols * this.nodeSize, time: 500, removeOnComplete: true, interrupt: false });
		}
    },
    calculate: function(value,additional) {
        return value * this.nodeSize + this.nodeSize/2 - additional;
    }
}
