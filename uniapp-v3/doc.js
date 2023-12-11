/**
	https://www.html5plus.org/doc/h5p.html
	
	1、新建下载任务;包含中文或空格等需要encodeURIComponent()
	plus.downloader.clear(); //清除下载任务
	let task = plus.downloader.createDownload("apiUrl+encodeURIComponent(array)", {
		filename: "_doc/order.zip", //下载文件保存路径 仅支持以"_downloads/"、"_doc/"、"_documents/"开头的字符串
		timeout: 0, //下载任务超时时间 默认值为120s  0则表示永远不超时
		priority: 100, //下载任务的优先级 数值越大优先级越高
		method: "GET", //POST,GET,默认GET
		data: null, //POST时提交的数据
		retry: 0, //下载任务重试次数,默认3
		retryInterval:30, //下载任务重试间隔时间 默认30s
	}, function(download, status) {
		download:{
			totalSize: 下载任务文件的总大小
			downloadedSize: 已完成下载文件的大小
			state: 任务的状态
		}
		// 下载完成 status == 200
		
	});
	task.setRequestHeader('token', "token123");
	task.setRequestHeader('Content-Type','application/json');
	task.start();
	
	task.addEventListener("statechanged", onStateChanged, false);
	function onStateChanged(download, status) {
		if(download.state == 4 && status == 200){
			// 下载完成 
			console.log("Download success: " + download.getFileName());  
		}  
	}
	
	2、压缩 
	src要压缩的源文件路径，支持文件路径或目录；zipfile压缩后保存的Zip文件路径
	plus.zip.compress(src, zipfile, successCB, errorCB);
	zipfile需解压Zip文件路径;target解压Zip文件的目标路径，必须是路径
	plus.zip.decompress( zipfile, target, successCB, errorCB);
	
	3、文件IO
	获取指定的文件系统 type:plus.io.PUBLIC_DOCUMENTS,plus.io.PRIVATE_DOC
	PRIVATE_WWW: 应用私有资源目录常量 PRIVATE_DOC: 应用私有文档目录常量 PUBLIC_DOCUMENTS: 应用公共文档目录常量 PUBLIC_DOWNLOADS: 应用公共下载目录常量
	plus.io.requestFileSystem( type, function(fs){
		let fullpath = fs.root.fullPath;
		let sdpath = fullpath.split("Android/data")[0] + "loncomipImport/";  //根目录下新建loncomipImport
	}, function(err){} );
	通过URL参数获取目录对象或文件对象
	path:"_doc/online/192.168.1.5/admin/order.txt" ||  "_doc/online/192.168.1.5/admin/order/"
	plus.io.resolveLocalFileSystemURL(path,function(entry){
		//读取这个目录对象 
		var directoryReader = entry.createReader();    
		directoryReader.readEntries(function(entries) {     
			//如果有才操作 
			if(entries.length>0){  
				//这样会将path这个目录文件也删除
				// entry.removeRecursively(function(entry) {      
				
				// }, function(e) { })  
				  
				for(let i=entries.length-1;i>=0;i--){
					entries[i].remove();
				}
			}else{
				
			}
		}, function(e) {})
		
		//读取文件信息
		entry.file(function(file) {
			let fileReader = new plus.io.FileReader();
			fileReader.readAsText(file);
			fileReader.onloadend = function(evt) {
				let str = evt.target.result;
			}
		});
		//判断是文件
		if (entry.isFile) {
			entry.remove(function(entry) {}, function(e) {});
		}
		//判断是目录
		if(entry.isDirectory){
			//递归删除目录，不会删除根目录
			entry.removeRecursively(function(){
				//删除成功回调
				
				//创建或打开子目录  ordername:要操作目录相对于当前目录的地址
				entry.getDirectory( "ordername", {
					create: true,  //指示如果文件或目录不存在时是否进行创建，默认值为false
					exclusive: false  //需与create属性值设置为true时一起使用
				}, succesCB, errorCB );
				
				//创建或打开子文件
				entry.getFile(filename,{
					create: true,
					exclusive: false
				},function(fileEntry){
					//向打开的这个文件中写JSON string数据
					fileEntry.createWriter( function(writer){
						writer.write("jsonstring");
						writer.onwrite = function(e) {console.log("完成了执行压缩")};
						writer.onerror = function(e) {};
					}, errorCB );
				})
				
			},errorCB)
		}
		
			
			
		
		//移动文件,拷贝文件  copyTo
		entry: 通过plus.io.resolveLocalFileSystemURL(移动的文件的path, function(entry){})
		dstEntry: 通过plus.io.resolveLocalFileSystemURL(mubiaopath, function(dstEntry){})
		newName: 移动后的文件名称 比如main.jpg  
		entry.moveTo( dstEntry, newName, succesCB, errorCB );
		
		plus.io.resolveLocalFileSystemURL(移动的文件的路径, function(entry){
			plus.io.resolveLocalFileSystemURL(移动到的文件目录的路径, function(dstEntry){
				entry.moveTo( dstEntry, 新的文件名比如order.txt, function(){
					
				}, function(){
					
				});
			})
		})
		
	})
	
	微信：
	预览图片：可以直接用uni.previewImage({})
	wx.previewImage({
		urls:pictures.map(v=>v.url),  //pictures为图片数组对象
		current:url  //当前的图片url
	})
	
*/
