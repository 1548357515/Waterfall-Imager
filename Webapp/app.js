window
		.addEventListener(
				'DOMContentLoaded',
				function(e) {
					var boxHandle = newNode();
					var waterfall = new Waterfall({
						minBoxWidth : 200
					});
					waterfall.addBox(boxHandle());
					// button click handle
					var btn = document.getElementById('add-btn');
					//var boxHandle = newNode();
					btn.addEventListener('click', function() {

						waterfall.addBox(boxHandle());
					});

					var scaleUpbtn = document.getElementById('scaleup-btn');
					scaleUpbtn.addEventListener('click', function() {

						waterfall.minBoxWidth += 50;
						waterfall.compose(true);
					});

					var scaleDownbtn = document.getElementById('scaledown-btn');
					scaleDownbtn.addEventListener('click', function() {

						waterfall.minBoxWidth -= 50;
						waterfall.compose(true);
					});

					window.onscroll = function() {
						var i = waterfall.getHighestIndex();
						if (i > -1) {
							// get last box of the column
							var lastBox = Array.prototype.slice.call(
									waterfall.columns[i].children, -1)[0];
							if (checkSlide(lastBox)) {
								var count = 5;
								while (count--)
									waterfall.addBox(boxHandle());
							}
						}
					};

					function checkSlide(elem) {
						if (elem) {
							var screenHeight = (document.documentElement.scrollTop || document.body.scrollTop)
									+ (document.documentElement.clientHeight || document.body.clientHeight);
							var elemHeight = elem.offsetTop + elem.offsetHeight
									/ 2;

							return elemHeight < screenHeight;
						}
					}

					function newNode() {
						var id = new Array();
						var image = new Array();
						var title = new Array();
						var f = 0;
						return function() {
							$.ajaxSettings.async = false; 
								$.getJSON("getMembers.json", function(data) {
									$.each(data, function(i, item) {
										id[i] = item.id;
										title[i] = item.title;
										image[i] = item.images;
									});

								});
							var box = document.createElement('div');
							box.className = 'wf-box';
							var im = document.createElement('img');
							im.src = image[f];
							box.appendChild(im);
							var content = document.createElement('div');
							content.className = 'content';
							var tit = document.createElement('h3');
							tit.appendChild(document.createTextNode(title[f]));
							content.appendChild(tit);
							var p = document.createElement('p');
							p.appendChild(document.createTextNode(id[f]));
							content.appendChild(p);
							box.appendChild(content);
							if (++f == id.length)
								f = 1;
							

							return box;
						};
					}
					
				});