var _0x3589=['notifyBLECharacteristicValueChange','properties','log','1F78010388','buffer','F000FFC0-0451-4000-B000-000000000000','push','charCodeAt','substring','android','onBLEConnectionStateChange','uuid','getSystemInfo','ios','name','1F78010288','length','devices','closeBLEConnection','read','getBLEDeviceServices','splice','map','^[A-Z]{0,2}[0-9]{4,5}[0-9A-Z]{2,3}[0-9]{2}$','0000180A-0000-1000-8000-00805F9B34FB','createBLEConnection','connected','onBLECharacteristicValueChange','5682904137','获取特征值失败','errCode','deviceId','errMsg','slice','toUpperCase','characteristics','exec','charAt','match','join','setBLEMTU','连接蓝牙设备失败'];var _0x48a1=function(_0x358927,_0x48a10d){_0x358927=_0x358927-0x0;var _0x2230d0=_0x3589[_0x358927];return _0x2230d0;};const sDeTongCheckSum=_0x48a1('0x1c');const maxSendDataLength=0xb4;const sendDataWaitTime=0x1c;var connectedDeviceId='';var connectedDevicServiceId='';var writeCharacteristicsId='';var readCharacteristicsId='';var notifyCharacteristicsId='';var interval=null;var printList=[];var supportPrefixKeys=[];var printHex='';var sDidSendDataHandler;var sDidSendHexHandler;module['exports']={'setSupportPrefixs':setSupportPrefixs,'initBLE':initBLE,'startScanPeripherals':startScanPeripherals,'stopScanPeripherals':stopScanPeripherals,'connectPeripheral':connectPeripheral,'disconnectPeripheral':disconnectPeripheral,'scanedPeripherals':scanedPeripherals,'sendData':sendData};function setSupportPrefixs(_0x236efd){supportPrefixKeys=_0x236efd;}function initBLE(_0x362624){wx['openBluetoothAdapter']({'success':function(_0x1fa3c3){console[_0x48a1('0x2')]('初始化蓝牙适配器成功！');startScanPeripherals(_0x362624);wx['onBluetoothAdapterStateChange'](function(_0x3fe974){});}});}function startScanPeripherals(_0xe9919c){wx['startBluetoothDevicesDiscovery']({'success':function(_0x344343){setTimeout(function(){scanedPeripherals(function(_0x5e53f5){if(_0xe9919c){_0xe9919c(_0x5e53f5);}});},0x5dc);}});}function stopScanPeripherals(){wx['stopBluetoothDevicesDiscovery']({'success':function(_0x4b4e74){}});}function connectPeripheral(_0x280596,_0x587736,_0xf06f4b){wx[_0x48a1('0xa')](function(_0x30122b){if(_0x30122b[_0x48a1('0x1f')]!=connectedDeviceId){return;}if(!_0x30122b[_0x48a1('0x1a')]){if(_0xf06f4b){_0xf06f4b();}}});stopScanPeripherals();wx[_0x48a1('0x19')]({'deviceId':_0x280596,'success':function(_0x1ed34a){connectedDeviceId=_0x280596;wx[_0x48a1('0x14')]({'deviceId':connectedDeviceId,'success':function(_0x429be3){var _0x5cfeeb=_0x429be3['services'];for(var _0x50ee45=0x0;_0x50ee45<_0x5cfeeb[_0x48a1('0x10')];_0x50ee45++){var _0x57ea96=_0x429be3['services'][_0x50ee45][_0x48a1('0xb')];if(_0x57ea96!=_0x48a1('0x5')&&_0x57ea96!='000018F0-0000-1000-8000-00805F9B34FB'&&_0x57ea96!='00001800-0000-1000-8000-00805F9B34FB'&&_0x57ea96!=_0x48a1('0x18')&&_0x57ea96!='00001801-0000-1000-8000-00805F9B34FB'){connectedDevicServiceId=_0x57ea96;break;}}wx['getBLEDeviceCharacteristics']({'deviceId':connectedDeviceId,'serviceId':connectedDevicServiceId,'success':function(_0x390b50){for(var _0x2ca72f=0x0;_0x2ca72f<_0x390b50['characteristics'][_0x48a1('0x10')];_0x2ca72f++){if(_0x390b50['characteristics'][_0x2ca72f][_0x48a1('0x1')]['notify']){notifyCharacteristicsId=_0x390b50['characteristics'][_0x2ca72f]['uuid'];}if(_0x390b50['characteristics'][_0x2ca72f][_0x48a1('0x1')]['write']){writeCharacteristicsId=_0x390b50['characteristics'][_0x2ca72f]['uuid'];}if(_0x390b50['characteristics'][_0x2ca72f][_0x48a1('0x1')][_0x48a1('0x13')]){readCharacteristicsId=_0x390b50[_0x48a1('0x23')][_0x2ca72f]['uuid'];}}wx[_0x48a1('0x0')]({'deviceId':connectedDeviceId,'serviceId':connectedDevicServiceId,'characteristicId':notifyCharacteristicsId,'state':!![],'success':function(_0x17a21b){}});wx[_0x48a1('0xc')]({'success':function(_0x2b8997){if(_0x2b8997['platform']==_0x48a1('0xd')){cheakDeviceType(!![]);}else if(_0x2b8997['platform']==_0x48a1('0x9')){cheakDeviceType(![]);wx[_0x48a1('0x28')]({'deviceId':connectedDeviceId,'mtu':0x200});}if(_0x587736){_0x587736();}}});},'fail':function(){console['log'](_0x48a1('0x1d'));},'complete':function(){}});}});},'fail':function(_0x5ea52f){console['log'](_0x48a1('0x29'),_0x5ea52f[_0x48a1('0x1e')],_0x5ea52f[_0x48a1('0x20')]);},'complete':function(){}});}function disconnectPeripheral(){wx[_0x48a1('0x12')]({'deviceId':connectedDeviceId,'success':function(_0x142526){}});}function scanedPeripherals(_0x4d3f01){wx['getBluetoothDevices']({'success':function(_0x2243e7){var _0x4042e1=new Array();for(var _0x431ccc=0x0;_0x431ccc<_0x2243e7['devices'][_0x48a1('0x10')];_0x431ccc++){var _0x5636b1=_0x2243e7[_0x48a1('0x11')][_0x431ccc][_0x48a1('0xe')];if(isMyPrinterForName(_0x5636b1)){_0x4042e1[_0x48a1('0x6')](_0x2243e7['devices'][_0x431ccc]);}}if(_0x4d3f01){_0x4d3f01(_0x4042e1);}}});}function sendData(_0x542ea5,_0x138cfa){if(printList==null){printList=new Array();}if(_0x542ea5!=null){printList['push'](_0x542ea5);if(printList[_0x48a1('0x10')]>0x0){var _0x520ea1=printList[0x0];if(_0x520ea1[_0x48a1('0x10')]>0x0){sDidSendDataHandler=_0x138cfa;postDatas();}else{clearInterval(interval);printList[_0x48a1('0x15')](0x0,0x1);if(_0x138cfa){_0x138cfa();}}}}}function postDatas(){cheakBufferSize('1F770088',function(_0x515228){if(_0x515228<=0xbb8){setTimeout(()=>{postDatas();},0x32);}else{printHex='';var _0x64d771=printList[0x0];for(;_0x64d771[_0x48a1('0x10')]>0x0;_0x64d771['splice'](0x0,0x1)){var _0x2a4904=_0x64d771[0x0];if(printHex['length']+_0x2a4904[_0x48a1('0x10')]>=_0x515228){break;}printHex+=_0x2a4904;}postHexValue(function(){if(_0x64d771[_0x48a1('0x10')]>0x0){postDatas();}else{printList['splice'](0x0,0x1);if(sDidSendDataHandler){sDidSendDataHandler();}}});}});}function postHexValue(_0xe836f5){sDidSendHexHandler=_0xe836f5;postHex();}function postHex(){if(printHex[_0x48a1('0x10')]>0x0){interval=setTimeout(function(){var _0x3703a3;if(printHex['length']>maxSendDataLength){_0x3703a3=printHex['substr'](0x0,maxSendDataLength);printHex=printHex[_0x48a1('0x8')](maxSendDataLength);}else{_0x3703a3=printHex;printHex='';}var _0xb7537d=new Uint8Array(_0x3703a3[_0x48a1('0x26')](/[\da-f]{2}/gi)[_0x48a1('0x16')](function(_0x5a6ab3){return parseInt(_0x5a6ab3,0x10);}));wx['writeBLECharacteristicValue']({'deviceId':connectedDeviceId,'serviceId':connectedDevicServiceId,'characteristicId':writeCharacteristicsId,'value':_0xb7537d['buffer'],'success':function(_0x53eec6){}});postHex();},sendDataWaitTime);}else{if(sDidSendHexHandler){sDidSendHexHandler();}}}function cheakDeviceType(_0x1f816f){var _0x6867be=_0x48a1('0xf');if(_0x1f816f){_0x6867be=_0x48a1('0x3');}var _0xfabed4=new Uint8Array(_0x6867be['match'](/[\da-f]{2}/gi)[_0x48a1('0x16')](function(_0x50132e){return parseInt(_0x50132e,0x10);}));wx['writeBLECharacteristicValue']({'deviceId':connectedDeviceId,'serviceId':connectedDevicServiceId,'characteristicId':writeCharacteristicsId,'value':_0xfabed4[_0x48a1('0x4')],'success':function(_0x4910e2){}});}function cheakBufferSize(_0x38f833,_0x9e38bc){var _0x1b51af=new Uint8Array(_0x38f833[_0x48a1('0x26')](/[\da-f]{2}/gi)[_0x48a1('0x16')](function(_0x3d6271){return parseInt(_0x3d6271,0x10);}));wx[_0x48a1('0x1b')](function(_0x52b1e7){if(_0x52b1e7[_0x48a1('0x1f')]!=connectedDeviceId){return;}var _0x1a9cac=ab2hex(_0x52b1e7['value']);var _0x31a2a5=0x0;var _0x3cc261=_0x1a9cac[0x3];if(_0x3cc261>=0xc0){var _0x2f0690=_0x1a9cac[0x3];var _0x4492f8=_0x1a9cac[0x4];_0x31a2a5=(_0x2f0690<<0x8)+_0x4492f8;}else{_0x31a2a5=_0x3cc261;}if(_0x9e38bc){_0x9e38bc(_0x31a2a5*0x1f4);}});wx['writeBLECharacteristicValue']({'deviceId':connectedDeviceId,'serviceId':connectedDevicServiceId,'characteristicId':writeCharacteristicsId,'value':_0x1b51af['buffer'],'success':function(_0x348af2){}});}function ab2hex(_0x1040e9){var _0x4eddaf=Array['prototype'][_0x48a1('0x16')]['call'](new Uint8Array(_0x1040e9),function(_0x2c28c6){return('00'+_0x2c28c6['toString'](0x10))[_0x48a1('0x21')](-0x2);});return _0x4eddaf[_0x48a1('0x27')](',');}function isMyPrinterForName(_0x346c8c){var _0x40bf22=_0x346c8c['toUpperCase']();var _0x3edc69=_0x40bf22['split']('-');if(_0x3edc69[_0x48a1('0x10')]>0x1){_0x40bf22=_0x3edc69[_0x3edc69[_0x48a1('0x10')]-0x1];if(_0x40bf22['length']<0x8){return![];}}else{return![];}var _0xe7ab32=new RegExp(_0x48a1('0x17'),'g');if(!_0xe7ab32[_0x48a1('0x24')](_0x40bf22)){return![];}var _0x289c56=new RegExp('^[0-9]+','g');var _0x1af456=_0x289c56[_0x48a1('0x24')](_0x40bf22);var _0x5d2b78='';var _0x4fa1df=0x0;if(_0x40bf22[_0x48a1('0x25')](0x1)<'0'||_0x40bf22['charAt'](0x1)>'9'){_0x5d2b78=_0x40bf22['substring'](0x0,0x2);_0x40bf22=_0x40bf22['substring'](0x2,_0x40bf22[_0x48a1('0x10')]);_0x4fa1df+=_0x5d2b78['charCodeAt'](0x0)*0xb;_0x4fa1df+=_0x5d2b78['charCodeAt'](0x1)*0xc;}else if(_0x40bf22[_0x48a1('0x25')](0x0)<'0'||_0x40bf22['charAt'](0x0)>'9'){_0x5d2b78=_0x40bf22[_0x48a1('0x8')](0x0,0x1);_0x40bf22=_0x40bf22['substring'](0x1,_0x40bf22['length']);_0x4fa1df+=_0x5d2b78[_0x48a1('0x7')](0x0)*0x11;}if(_0x5d2b78['toUpperCase']()=='D'||_0x5d2b78[_0x48a1('0x22')]()=='O'){}else if(_0x40bf22[_0x48a1('0x10')]<0x8){return![];}else{if(supportPrefixKeys['length']>0x0){for(var _0x93d53=0x0;_0x93d53<supportPrefixKeys[_0x48a1('0x10')];_0x93d53++){var _0x27142d=supportPrefixKeys[_0x93d53];if(_0x27142d['length']>0x0){var _0xde39aa=_0x40bf22[_0x48a1('0x8')](0x0,_0x27142d['length']);if(_0xde39aa['toUpperCase']()==_0x27142d[_0x48a1('0x22')]()){break;}}else{return![];}}}}if(!_0x1af456||_0x40bf22['length']>=0x9||_0x40bf22['charAt'](0x3)!='0'){if(_0x1af456){_0x4fa1df+=(_0x40bf22['charAt'](0x0)-'0')*0x2;_0x4fa1df+=(_0x40bf22[_0x48a1('0x25')](0x1)-'0')*0x3;_0x4fa1df+=(_0x40bf22['charAt'](0x2)-'0')*0x5;for(var _0x93d53=0x4;_0x93d53<_0x40bf22[_0x48a1('0x10')];++_0x93d53){_0x4fa1df+=(_0x40bf22['charAt'](_0x93d53)-'0')*((_0x93d53&0x1)==0x0?0x7:0x9);}}else{_0x4fa1df+=_0x40bf22['charAt'](0x0)*0x2;_0x4fa1df+=_0x40bf22['charAt'](0x1)*0x3;_0x4fa1df+=_0x40bf22[_0x48a1('0x25')](0x2)*0x5;for(var _0x93d53=0x4;_0x93d53<_0x40bf22[_0x48a1('0x10')];++_0x93d53){_0x4fa1df+=_0x40bf22[_0x48a1('0x7')](_0x93d53)*((_0x93d53&0x1)==0x0?0x7:0x9);}}var _0x5182c2=_0x4fa1df%0xa;if(sDeTongCheckSum['charAt'](_0x5182c2)!=_0x40bf22[_0x48a1('0x25')](0x3)){return![];}}return!![];}