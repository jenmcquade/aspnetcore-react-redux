/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "31026e07f4a42c16bb2d"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) me.children.push(request);
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (typeof dep === "undefined") hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (typeof dep === "undefined") hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle")
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			{
/******/ 				// eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		"main-client": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../README.md":
/*!******************!*\
  !*** /README.md ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 id=\"aspnetcore-react-redux\"><strong><code>aspnetcore-react-redux</code></strong></h1>\n<h2 id=\"asp-net-core-2-mvc-spa-boilerplate-with-json-entpoints\">ASP.NET Core 2 MVC SPA boilerplate with JSON entpoints</h2>\n<h3 id=\"hello-from-jon-in-tacoma-the-toe-of-sea_tac-zip-404\">Hello from Jon in Tacoma, the toe of <em>SEA_TAC</em>, Zip **404</h3>\n<hr>\n<p><img class=\"tacoma\" src='https://upload.wikimedia.org/wikipedia/commons/e/ee/Tacoma_Dome.jpg' alt=\"Tacoma Dome\" /></p>\n<p><h4 align=center>#WeBuildThingsHere</h4></p>\n<hr>\n<h2 id=\"about-this-asp-net-core-2-spa-template\">About this ASP .NET Core 2 SPA Template</h2>\n<h3 id=\"this-project-builds-from-the-src-directory-\">This project builds from the <code>src</code> directory.</h3>\n<ul>\n<li><em>Dockerized Boilerplate</em> for <em>C# ASP .NET Core 2.1 MVC SPA</em> development, with Isomorphic React and Redux server and client-side rendering of React Components.</li>\n<li>Develop, debug, build, publish and release <strong>.NET Core 2.1 ASP .NET</strong> apps without installing .NET locally, using pre-built Docker images running Linux Alpine.  </li>\n<li>This <code>README.md</code> file is dynamically loaded into the <code>src/ClientApp/components/About</code> component as a demonstration of a simple no-db CMS. When debugging locally in Development, you can access this same README within the app at <strong><a href=\"http://localhost:5000/about\">http://localhost:5000/about</a></strong>.  Using <code>docker-compose up</code> in the src directory, it can be accessed at <strong><a href=\"http://localhost:8080/about\">http://localhost:8080/about</a></strong>.</li>\n<li><strong>Library dependencies</strong> are the freshest versions as of 3/13/2018, including <em>Microsoft .NET Core Runtime 2.1.0 Preview1</em> and <em>aspnetcore2.1</em> targeting, with up-to-date and alpha <em>package.json</em> references.</li>\n<li><strong>API and microservices examples</strong>: Demonstration of <em>CSV</em> to <em>ASP.NET Controller</em> conversion, with JSON API for file I/O, seperate from the UI.  </li>\n<li>Demonstration of isomorphic design using ASP .NET Prerendering of React, Redux and React Router</li>\n<li><strong>Bootstrap 4</strong> and <strong>Webpack 4</strong> compatible frontend with <strong>React Hot Module Replacement</strong> when running locally.  State is maintained between routes, inside of the Redux store.  <strong>HMR using Docker is not yet resolved: file changes do not trigger a build.</strong></li>\n<li><strong>ActionScript</strong> is moderately implemented, as to not scare off junior developers.</li>\n</ul>\n<h3 id=\"project-history\">Project History</h3>\n<ul>\n<li><strong>V1</strong> (implementing <em>.NET Core SDK 1</em>) was developed in August 2017.  <strong>V2</strong> (implementing <em>.NET Core SDK 2</em>) was developed in March, 2018.  </li>\n</ul>\n<h2 id=\"what-s-in-the-box-\">What&#39;s in the box?</h2>\n<ul>\n<li><a href=\"https://get.asp.net/\">ASP.NET Core 2.1.* SDK</a> implemented using <a href=\"https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx\">C# for cross-platform server-side code</a></li>\n<li><a href=\"https://www.nuget.org/packages/CsvHelper\">CsvHelper Nuget Package</a> for loading CSV file resources using disk I/O and converting to JSON</li>\n<li><a href=\"https://facebook.github.io/react/\">React</a>, <a href=\"http://redux.js.org\">Redux</a>, and  <a href=\"http://www.typescriptlang.org\">TypeScript for client-side code</a></li>\n<li><a href=\"https://github.com/ReactTraining/react-router\">React Router</a> and <a href=\"https://github.com/reactjs/react-router-redux\">React Router Redux</a>, for routing with State Management</li>\n<li><a href=\"https://www.npmjs.com/package/aspnet-webpack\">AspNet-Webpack Middleware</a> and  <a href=\"https://webpack.js.org/guides/hot-module-replacement/\">Hot Module Replacement</a>, for auto-reloading of saved resources in development</li>\n<li><a href=\"https://webpack.github.io\">Webpack 4</a> for building and bundling client-side resources</li>\n<li><a href=\"https://fontawesome.com\">Font Awesome</a> for font imports</li>\n<li><a href=\"http://getbootstrap.com/\">Bootstrap 4</a>  for layout and styling</li>\n<li><a href=\"https://sass-lang.com/install]\">Sass</a> to transpile vendor and this app&#39;s CSS</li>\n<li><a href=\"https://docs.docker.com/engine/installation/\">Docker</a> for release management and local debugging</li>\n<li>Environment configurations for <em>Production</em> and <em>Development</em>, including configurations for <code>dotnet restore</code>, <code>dotnet build</code> and <code>dotnet publish</code> both locally and through Docker.  Distribution bundles are handled independently, allowing you to build a Debug or a Release .dll or standalone app, with dynamic hosting configurations included for Heroku port management.</li>\n</ul>\n<h2 id=\"up-and-running\">Up and Running</h2>\n<hr>\n<h5 id=\"the-easiest-way-to-get-started-is-to-install-docker-on-your-machine-once-installed-run-this-command-inside-of-the-project-s-src-directory-br-\"><strong>The easiest way to get started</strong> is to install <code>docker</code> on your machine.  Once installed, run this <code>command</code> inside of the project&#39;s <strong>src</strong> directory:<br></h5>\n<ul>\n<li><code>docker-compose up</code></li>\n<li>This will download the latest (:dev) build and create a container. <code>npm install</code>, as well as <code>webpack</code> packaging are initiated automatically before the server starts.</li>\n</ul>\n<h5 id=\"when-initial-site-caching-has-completed-open-http-localhost-8080-in-your-browser-\">When initial site caching has completed, open <code>http://localhost:8080</code> in your browser.</h5>\n<h4 id=\"what-happens-when-i-run-this-\">What happens when I run this?</h4>\n<ul>\n<li><em>Docker Compose</em> is configured to pull a Dockerhub image to your machine named  <strong><code>jonmcquade/aspnetcore-react-redux</code></strong> with the <strong><code>:dev</code></strong> tag. </li>\n<li>You can also build your own version of the image using <code>docker-compose build</code> in the src directory. </li>\n<li>Docker Compose passes build arguments to the <em>Dockerfile</em> build configuration to create a (:dev) tagged image.  <code>dotnet restore</code> is run during the build to pull down project dependencies.  When the container runs, the entrypoint script is executed, then runs <code>npm install</code> and <code>webpack</code> commands inside the container to generate static site files.</li>\n<li>Docker Compose runs the image in a <strong>container</strong>, mapping the host&#39;s <code>8080</code> port to the container&#39;s <code>3000</code> port.</li>\n<li>The host&#39;s <code>./src</code> folder is mapped to the container&#39;s <code>/dotnetcorespa</code> directory using shared volumes.   </li>\n<li>The Development build contains <strong>WebPack middleware</strong> to initiate <strong>Hot Module Replacement</strong> in most project files.  As you save <code>ClientApp</code> files, <em>Webpack</em> will rebundle and inject the updates to the DOM without a need to refresh the page. <strong>This is currently broken using Docker but works when debugging locally (Runtime and SDK installed on host machine)</strong></li>\n</ul>\n<h4 id=\"docker-to-run-a-production-build-and-publish-a-self-contained-executable\">Docker: To run a Production build and publish a self-contained executable</h4>\n<ul>\n<li><a href=\"https://docs.docker.com/install/]https://docs.docker.com/install\">Install Docker</a></li>\n<li>Run the <code>command</code> below in the project (&quot;.&quot;) directory to publish a Production build of your app:</li>\n<li><code>docker-compose up</code></li>\n<li>The <code>Dockerfile</code> builds a base image of <strong><code>jonmcquade/aspnetcore-react-redux</code></strong> with a tag of <strong><code>latest</code></strong>.  This image is much smaller than the <strong><code>:dev</code></strong> tag because it does not include the <em>.NET Core 2 SDK</em>. A standalone <em>Production</em> build only requires the <em>.NET Core 2 Runtime Dependency libraries</em>.</li>\n</ul>\n<p>While the container is running, run:</p>\n<ul>\n<li><code>docker exec aspnetcore-react-redux dotnet -c Release publish -o /app</code> to publish the app inside the Docker container</li>\n<li><code>docker cp aspnetcore-react-redux:/app ./app</code> to copy the published self-contained executable to your local host. </li>\n</ul>\n<hr>\n<h5 id=\"note\">Note</h5>\n<p><em>Docker Compose</em> creates a container named <code>aspnetcore-react-redux</code>.  You can run <code>docker exec -ti aspnetcore-react-redux shell</code> to enter an interactive terminal into the running <em>Docker Container</em> that <em>Docker Compose</em> started.  This way, you can run your commands directly in the Docker container without needing to run docker clr commands from your host.</p>\n<hr>\n<h2 id=\"to-develop-locally-without-using-docker\">To develop locally without using Docker</h2>\n<hr>\n<h5 id=\"note\">Note</h5>\n<h6 id=\"this-app-targets-the-net-core-2-1-runtime-this-was-decided-due-to-the-recent-release-of-net-core-2-1-sdk-and-runtimes-using-docker-images-under-linux-alpine-with-an-amd-64-bit-cpu-apline-produces-much-smaller-builds-\">This app targets the <strong>.NET Core 2.1 Runtime</strong>.  This was decided due to the recent release of <em>.NET Core 2.1 SDK</em> and Runtimes using Docker images under <strong>Linux Alpine</strong> with an <strong>AMD 64-bit CPU</strong>. <em>Apline</em> produces much smaller builds.</h6>\n<hr>\n<h5 id=\"requirements-for-local-development\">Requirements for local development</h5>\n<ul>\n<li><a href=\"https://nodejs.org/en/download/\">NodeJS 8</a> with NPM 5</li>\n<li><a href=\"https://webpack.js.org/\">Webpack 4</a><h5 id=\"also-\">Also...</h5>\n</li>\n</ul>\n<hr>\n<ul>\n<li><a href=\"https://www.visualstudio.com/vs/preview\">Visual Studio 2017 Preview</a> with <strong>&quot;ASP.NET and web development&quot;</strong> selected in the Visual Studio Installer. <h5 id=\"why-the-preview-release-\">Why the Preview release?</h5>\n</li>\n<li>The Preview version includes the <em>.NET Core 2.1 SDK and Runtime</em>.  <strong>Depending on your version of Visual Studio, you might not be able to target <code>.NET Core 2.1 Runtime</code> inside the IDE yet</strong>.  </li>\n<li>You can modify the <code>global.json</code> project file to target a previous version of the .NET Core 2 runtime, such as the more-supported 2.0.  2.1 is a project requirement for Docker support, not for running or building locally. </li>\n</ul>\n<hr>\n<h2 id=\"to-build-or-publish-locally\">To build or publish locally</h2>\n<h3 id=\"requirements\">Requirements</h3>\n<p><strong>Visual Studio Community</strong> and also <a href=\"https://code.visualstudio.com\">VS Code</a> are free to download. <strong>These downloads are not required if using Docker</strong>.</p>\n<ul>\n<li><a href=\"https://www.microsoft.com/net/download/linux-package-manager/ubuntu17-10/sdk-2.1.300-preview1\">.NET Core 2 SDK 2.1.300-preview1-008174</a> if you&#39;re not installing <em>Visual Studio 2017 Preview</em></li>\n<li><a href=\"https://www.microsoft.com/net/download/dotnet-core/runtime-2.1.0-preview1\">.NET Runtime 2.1.0-preview1 </a> if you&#39;re running without <em>Visual Studio</em></li>\n</ul>\n<h3 id=\"commands\">Commands</h3>\n<ul>\n<li>Run <code>dotnet build -c Release -o ./app</code> to build the .NET libraries.  This does not run <code>npm install</code> or <code>webpack</code> operations.</li>\n<li>Run <code>dotnet publish -c Release -o ./app</code> to publish to the <em>./app</em> directory.  This performs <code>npm install</code> and <code>webpack</code> operations for you. </li>\n</ul>\n<h3 id=\"to-run-using-locally-installed-net-core-2-1-sdk-tools-without-docker-\">To run using locally installed .Net Core 2.1 SDK tools (without Docker):</h3>\n<h4 id=\"inside-the-src-directory-br-\">Inside the <em>.src</em> directory: <br></h4>\n<h5 id=\"development\">Development</h5>\n<ul>\n<li><code>$ dotnet restore</code></li>\n<li><code>$ npm install</code></li>\n<li><code>$ webpack --mode=development --config=&quot;webpack.config.vendor&quot;</code></li>\n<li><code>$ webpack --mode=development</code></li>\n<li><code>$ dotnet run</code></li>\n</ul>\n<h5 id=\"to-debug-a-release-build-locally-from-the-src-directory\">To debug a Release build locally from the <em>.src</em> directory</h5>\n<ul>\n<li><code>$ dotnet publish -c Release</code></li>\n<li><code>$ dotnet run</code></li>\n</ul>\n<h5 id=\"the-application-will-be-available-http-localhost-5000\">The application will be available <a href=\"http://localhost:5000\">http://localhost:5000</a></h5>\n<hr>\n<h5 id=\"note-about-using-visual-studio\">Note about using <strong>Visual Studio</strong></h5>\n<p>You can also run a build from within Visual Studio using the Build and Debug menus. However, you will still need to manually run NPM and Webpack commands in order to generate the cacheable/static files for the SPA (see above commands). You may also get errors for not being able to target the <code>.NET Core 2.1</code> runtime.</p>\n<hr>\n";

/***/ }),

/***/ "./ClientApp/boot-client.tsx":
/*!***********************************!*\
  !*** ./ClientApp/boot-client.tsx ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-redux */ "./node_modules/react-router-redux/es/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var history_createBrowserHistory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! history/createBrowserHistory */ "./node_modules/history/createBrowserHistory.js");
/* harmony import */ var history_createBrowserHistory__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(history_createBrowserHistory__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _configureStore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./configureStore */ "./ClientApp/configureStore.ts");
/* harmony import */ var _store_Search__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./store/Search */ "./ClientApp/store/Search.ts");
/* harmony import */ var _store_About__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./store/About */ "./ClientApp/store/About.ts");
/* harmony import */ var _components_Routes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/Routes */ "./ClientApp/components/Routes.tsx");
/* harmony import */ var _dist_bootstrap_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dist/bootstrap.css */ "./ClientApp/dist/bootstrap.css");
/* harmony import */ var _dist_bootstrap_css__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_dist_bootstrap_css__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _sass_site_scss__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./sass/site.scss */ "./ClientApp/sass/site.scss");
/* harmony import */ var _sass_site_scss__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_sass_site_scss__WEBPACK_IMPORTED_MODULE_11__);
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};












var readmePath = __webpack_require__(/*! ../../README.md */ "../README.md");
function main() {
    // Get the application-wide store instance, prepopulating with state from the server where available.
    // Create browser history to use in the Redux store
    // const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')!;
    var history = history_createBrowserHistory__WEBPACK_IMPORTED_MODULE_5___default()();
    var initialState = window.initialReduxState;
    // Get the application-wide store instance, prepopulating with state from the server where available.
    var store = Object(_configureStore__WEBPACK_IMPORTED_MODULE_6__["default"])(history, initialState);
    var searchActions = _store_Search__WEBPACK_IMPORTED_MODULE_7__["actionCreators"];
    var aboutActions = _store_About__WEBPACK_IMPORTED_MODULE_8__["actionCreators"];
    var InlineScript = function (_a) {
        var script = _a.script;
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("script", { dangerouslySetInnerHTML: { __html: script } });
    };
    store.dispatch(searchActions.setAirportFromUrl(window.location.pathname, _store_Search__WEBPACK_IMPORTED_MODULE_7__["actionCreators"]));
    store.dispatch(aboutActions.setAboutMarkDown({
        value: readmePath,
    }));
    var props = __assign({}, initialState, _store_Search__WEBPACK_IMPORTED_MODULE_7__["actionCreators"], _store_About__WEBPACK_IMPORTED_MODULE_8__["actionCreators"], store);
    function renderApp(store, history) {
        // This code starts up the React app when it runs in a browser. It sets up the routing configuration
        // and injects the app into a DOM element.
        react_dom__WEBPACK_IMPORTED_MODULE_2__["hydrate"](react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_hot_loader__WEBPACK_IMPORTED_MODULE_3__["AppContainer"], null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_redux__WEBPACK_IMPORTED_MODULE_4__["Provider"], { store: store },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_redux__WEBPACK_IMPORTED_MODULE_1__["ConnectedRouter"], { history: history },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { id: "App" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_Routes__WEBPACK_IMPORTED_MODULE_9__["default"], __assign({}, props)),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](InlineScript, { script: "window.initialReduxState = " + JSON.stringify(initialState) }))))), document.getElementById('react-app'));
    }
    renderApp(store, history);
    // Allow Hot Module Replacement
    if (true) {
        module.hot.accept(/*! ./components/Routes */ "./ClientApp/components/Routes.tsx", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _components_Routes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/Routes */ "./ClientApp/components/Routes.tsx");
(function () {
            renderApp(store, history);
        })(__WEBPACK_OUTDATED_DEPENDENCIES__); });
    }
}
main();


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/dotnetcorespa/ClientApp/boot-client.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/dotnetcorespa/ClientApp/boot-client.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./ClientApp/components/About.tsx":
/*!****************************************!*\
  !*** ./ClientApp/components/About.tsx ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var About = /** @class */ (function (_super) {
    __extends(About, _super);
    function About() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    About.prototype.render = function () {
        var markdown = this.props.about.markdown;
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "msg-body" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "msg-wrapper" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "msg-inner" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("article", { dangerouslySetInnerHTML: { __html: markdown } }))));
    };
    return About;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (About);


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/dotnetcorespa/ClientApp/components/About.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/dotnetcorespa/ClientApp/components/About.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./ClientApp/components/Airport.tsx":
/*!******************************************!*\
  !*** ./ClientApp/components/Airport.tsx ***!
  \******************************************/
/*! exports provided: changeAirport, renderSelect, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeAirport", function() { return changeAirport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderSelect", function() { return renderSelect; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-redux */ "./node_modules/react-router-redux/es/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _store_Search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store/Search */ "./ClientApp/store/Search.ts");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var changeAirport = function (event, c) {
    try {
        var v = event.target.value;
        var n = event.target.options[event.target.selectedIndex].innerHTML;
        var s = c.props.search.sort;
        c.props.setAirport({ code: v, name: n });
        c.props.requestFlights(v, s);
        c.props.dispatch(Object(react_router_redux__WEBPACK_IMPORTED_MODULE_1__["push"])('/filter/' + v + '/' + s.type));
    }
    catch (e) {
        console.log(e.message);
    }
};
var renderSelect = function (c) {
    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "container" },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["FormGroup"], { id: "airport", controlId: "formControlsSelect" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["FormControl"], { ref: "airportSelect", onChange: function (e) { changeAirport(e, c); }, componentClass: "select", defaultValue: c.props.search.airport.code, placeholder: c.props.search.airport.code, className: "selectpicker" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: "ALL" }, "Airports"),
                c.props.search.airports.map(function (airport) {
                    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: airport.code, value: airport.code }, airport.name);
                }),
                ";")));
};
var Airport = /** @class */ (function (_super) {
    __extends(Airport, _super);
    function Airport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Airport.prototype.render = function () {
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "msg-body" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "msg-wrapper" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "msg-inner" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h2", null, "Please select an airport"),
                    renderSelect(this))));
    };
    return Airport;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(function (state) { return state; }, // Selects which state properties are merged into the component's props
_store_Search__WEBPACK_IMPORTED_MODULE_3__["actionCreators"])(Airport));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/dotnetcorespa/ClientApp/components/Airport.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/dotnetcorespa/ClientApp/components/Airport.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./ClientApp/components/Filter.tsx":
/*!*****************************************!*\
  !*** ./ClientApp/components/Filter.tsx ***!
  \*****************************************/
/*! exports provided: changeSort, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeSort", function() { return changeSort; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-redux */ "./node_modules/react-router-redux/es/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _store_Search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store/Search */ "./ClientApp/store/Search.ts");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var changeSort = function (event, props) {
    var v = event.target.value;
    var l = event.target.options[event.target.selectedIndex].innerHTML;
    var apc = props.search.airport.code.toString();
    props.requestFlights(apc, { type: v, label: l });
    props.setSort(apc, { type: v, label: l });
    props.dispatch(Object(react_router_redux__WEBPACK_IMPORTED_MODULE_1__["push"])('/filter/' + apc + '/' + v));
};
var renderSortSelection = function (props) {
    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "container" },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["FormGroup"], { id: "sort", controlId: "formControlsSelect" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["FormControl"], { ref: "sortSelect", onChange: function (e) { return changeSort(e, props); }, defaultValue: props.search.sort.type, componentClass: "select", placeholder: "select", className: "selectpicker" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: "departs" }, "Sort by"),
                props.search.sorts.map(function (sort) {
                    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: sort.type, value: sort.type }, sort.label);
                }),
                ";")));
};
var renderTitleIntro = function (name) {
    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h2", { className: "airport" },
        "Flights leaving ",
        name);
};
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Filter.prototype.componentDidMount = function () {
        var apc = this.props.search.airport.code.toString();
        var path = window.location.pathname;
        this.props.setAirportFromUrl(window.location.pathname, _store_Search__WEBPACK_IMPORTED_MODULE_3__["actionCreators"]);
        this.props.requestFlights(this.props.search.airport.code, this.props.search.sort);
    };
    Filter.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.props.search.airport.code !== nextProps.search.airport.code) {
            var apc = this.props.search.airport.code.toString();
            nextProps.dispatch(nextProps.setAirportFromUrl(window.location.pathname, _store_Search__WEBPACK_IMPORTED_MODULE_3__["actionCreators"]));
            nextProps.requestFlights(nextProps.search.airport.code, nextProps.search.sort);
        }
    };
    Filter.prototype.renderFlights = function () {
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "flight" }, this.props.search.flights.map(function (flight) {
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { key: flight.flightNumber + "/" + flight.from + "/" + flight.to, className: "plan col-12 col-xs-12 col-sm-7 col-md-5 col-lg-5 col-xl-3" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "title" },
                    flight.flightNumber,
                    " ",
                    flight.from,
                    " to ",
                    flight.to),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "details" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", null,
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", null,
                            "Departs: ",
                            new Date(flight.departs).getHours() % 12 || 12,
                            ":",
                            new Date(flight.departs).getMinutes() < 10 ? new Date(flight.departs).getMinutes() + "0" : new Date(flight.departs).getMinutes(),
                            " ",
                            new Date(flight.departs).getHours() > 11 ? "PM" : "AM"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", null,
                            "Arrives: ",
                            new Date(flight.arrives).getHours() % 12 || 12,
                            ":",
                            new Date(flight.arrives).getMinutes() < 10 ? new Date(flight.arrives).getMinutes() + "0" : new Date(flight.arrives).getMinutes(),
                            " ",
                            new Date(flight.arrives).getHours() > 11 ? "PM" : "AM"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", null,
                            "Cabin: $",
                            flight.mainCabinPrice),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", null,
                            "First Class: $",
                            flight.firstClassPrice))));
        }));
    };
    Filter.prototype.render = function () {
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "msg-body" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "msg-wrapper" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "msg-inner" },
                    renderTitleIntro(this.props.search.airport.name),
                    renderSortSelection(this.props),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "grid" }, this.renderFlights()))));
    };
    return Filter;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(function (state) { return state; }, // Selects which state properties are merged into the component's props
_store_Search__WEBPACK_IMPORTED_MODULE_3__["actionCreators"])(Filter));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/dotnetcorespa/ClientApp/components/Filter.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/dotnetcorespa/ClientApp/components/Filter.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./ClientApp/components/Home.tsx":
/*!***************************************!*\
  !*** ./ClientApp/components/Home.tsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Home.prototype.render = function () {
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "msg-body" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "msg-wrapper" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "msg-inner" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", null, "Find Your Connections"),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], { className: 'btn btn-lg btn-primary', to: '/airport' }, "Begin Search"))));
    };
    return Home;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (Home);


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/dotnetcorespa/ClientApp/components/Home.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/dotnetcorespa/ClientApp/components/Home.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./ClientApp/components/Layout.tsx":
/*!*****************************************!*\
  !*** ./ClientApp/components/Layout.tsx ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");
/* harmony import */ var _NavMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NavMenu */ "./ClientApp/components/NavMenu.tsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _store_Search__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../store/Search */ "./ClientApp/store/Search.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};





var Layout = /** @class */ (function (_super) {
    __extends(Layout, _super);
    function Layout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Layout.prototype.render = function () {
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "container-fluid h-100" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], { className: "justify-content-center h-100" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], { id: "contextNav", className: "h-100 col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 hidden-md-down" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("section", null,
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_NavMenu__WEBPACK_IMPORTED_MODULE_2__["NavMenu"], __assign({}, this.props)))),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], { id: "contextBody", className: "h-100 col-6 col-sm-8 col-md-8 col-lg-7 col-xl-7 align-self-start" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("section", null, this.props.children))));
    };
    return Layout;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(function (state) { return state; }, // Selects which state properties are merged into the component's props
_store_Search__WEBPACK_IMPORTED_MODULE_4__["actionCreators"])(Layout));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/dotnetcorespa/ClientApp/components/Layout.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/dotnetcorespa/ClientApp/components/Layout.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./ClientApp/components/NavMenu.tsx":
/*!******************************************!*\
  !*** ./ClientApp/components/NavMenu.tsx ***!
  \******************************************/
/*! exports provided: NavMenu, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavMenu", function() { return NavMenu; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _store_Search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store/Search */ "./ClientApp/store/Search.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




__webpack_require__(/*! svg-url-loader?limit=1024!../plane.svg */ "./node_modules/svg-url-loader/index.js?limit=1024!./ClientApp/plane.svg");
var NavMenu = /** @class */ (function (_super) {
    __extends(NavMenu, _super);
    function NavMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavMenu.prototype.render = function () {
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'main-nav' },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'navbar navbar-inverse' },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'navbar-header' },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["NavLink"], { exact: true, className: 'navbar-brand', to: '/' },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'app-logo' }))),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'clearfix' }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'container' },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", { className: 'nav navbar-nav' },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", null,
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["NavLink"], { exact: true, to: '/' },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: 'fa fa-home' }),
                                " Home")),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", null,
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["NavLink"], { exact: true, to: '/airport', activeClassName: 'active' },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: 'fa fa-search' }),
                                " Search by Airport")),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", null,
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["NavLink"], { exact: true, to: '/filter/' +
                                    this.props.search.airport.code.toString() +
                                    '/' + this.props.search.sort.type, activeClassName: 'active' },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: 'fa fa-th-list' }),
                                " Sort Results")),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", null,
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["NavLink"], { exact: true, to: '/about', activeClassName: 'active' },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: 'fa fa-book' }),
                                " About this App"))))));
    };
    return NavMenu;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(function (state) { return state; }, // Selects which state properties are merged into the component's props
_store_Search__WEBPACK_IMPORTED_MODULE_3__["actionCreators"])(NavMenu));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/dotnetcorespa/ClientApp/components/NavMenu.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/dotnetcorespa/ClientApp/components/NavMenu.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./ClientApp/components/Routes.tsx":
/*!*****************************************!*\
  !*** ./ClientApp/components/Routes.tsx ***!
  \*****************************************/
/*! exports provided: Routes, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Routes", function() { return Routes; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _store_Search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store/Search */ "./ClientApp/store/Search.ts");
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! history */ "./node_modules/history/es/index.js");
/* harmony import */ var _configureStore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../configureStore */ "./ClientApp/configureStore.ts");
/* harmony import */ var _Layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Layout */ "./ClientApp/components/Layout.tsx");
/* harmony import */ var _Home__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Home */ "./ClientApp/components/Home.tsx");
/* harmony import */ var _Airport__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Airport */ "./ClientApp/components/Airport.tsx");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Filter */ "./ClientApp/components/Filter.tsx");
/* harmony import */ var _About__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./About */ "./ClientApp/components/About.tsx");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};











var store = Object(_configureStore__WEBPACK_IMPORTED_MODULE_5__["default"])(Object(history__WEBPACK_IMPORTED_MODULE_4__["createMemoryHistory"])());
var Routes = /** @class */ (function (_super) {
    __extends(Routes, _super);
    function Routes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Routes.prototype.render = function () {
        var _this = this;
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Layout__WEBPACK_IMPORTED_MODULE_6__["default"], __assign({}, this.props),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], { exact: true, path: '/', render: function () { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Home__WEBPACK_IMPORTED_MODULE_7__["default"], null); } }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], { path: '/airport', render: function () { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Airport__WEBPACK_IMPORTED_MODULE_8__["default"], __assign({}, _this.props)); } }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], { exact: true, path: '/filter', render: function () { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Filter__WEBPACK_IMPORTED_MODULE_9__["default"], __assign({}, _this.props)); } }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], { exact: true, path: '/filter/:airportCode', render: function () { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Filter__WEBPACK_IMPORTED_MODULE_9__["default"], __assign({}, _this.props)); } }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], { exact: true, path: '/filter/:airportCode/:sortBy', render: function () { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Filter__WEBPACK_IMPORTED_MODULE_9__["default"], __assign({}, _this.props)); } }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], { path: '/about', render: function () { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_About__WEBPACK_IMPORTED_MODULE_10__["default"], __assign({}, _this.props)); } }));
    };
    return Routes;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(function (state) { return state; }, // Selects which state properties are merged into the component's props
_store_Search__WEBPACK_IMPORTED_MODULE_3__["actionCreators"])(Routes));


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/dotnetcorespa/ClientApp/components/Routes.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/dotnetcorespa/ClientApp/components/Routes.tsx"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./ClientApp/configureStore.ts":
/*!*************************************!*\
  !*** ./ClientApp/configureStore.ts ***!
  \*************************************/
/*! exports provided: createAppStore, default, getState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAppStore", function() { return createAppStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return configureStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getState", function() { return getState; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/index.js");
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-thunk */ "./node_modules/redux-thunk/lib/index.js");
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_thunk__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-redux */ "./node_modules/react-router-redux/es/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./store */ "./ClientApp/store/index.ts");
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};




function createAppStore(history, initialState) {
    // Build middleware. These are functions that can process the actions before they reach the store.
    var windowIfDefined = typeof window === 'undefined' ? null : window;
    // If devTools is installed, connect to it
    var devToolsExtension = windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__;
    var createStoreWithMiddleware = Object(redux__WEBPACK_IMPORTED_MODULE_0__["compose"])(Object(redux__WEBPACK_IMPORTED_MODULE_0__["applyMiddleware"])(redux_thunk__WEBPACK_IMPORTED_MODULE_1___default.a, Object(react_router_redux__WEBPACK_IMPORTED_MODULE_2__["routerMiddleware"])(history)), devToolsExtension ? devToolsExtension() : function (next) { return next; })(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"]);
    // Combine all reducers and instantiate the app-wide store instance
    var allReducers = buildRootReducer(_store__WEBPACK_IMPORTED_MODULE_3__["reducers"]);
    var store = createStoreWithMiddleware(allReducers, initialState);
    return store;
}
function configureStore(history, initialState) {
    var store = createAppStore(history, initialState);
    // Enable Webpack hot module replacement for reducers
    if (true) {
        module.hot.accept(/*! ./store */ "./ClientApp/store/index.ts", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./store */ "./ClientApp/store/index.ts");
(function () {
            var nextRootReducer = __webpack_require__(/*! ./store */ "./ClientApp/store/index.ts");
            store.replaceReducer(buildRootReducer(nextRootReducer.reducers));
        })(__WEBPACK_OUTDATED_DEPENDENCIES__); });
    }
    return store;
}
function getState(history, initialState) {
    return configureStore(history, initialState);
}
function buildRootReducer(allReducers) {
    return Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(__assign({}, allReducers, { router: react_router_redux__WEBPACK_IMPORTED_MODULE_2__["routerReducer"] }));
}


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/dotnetcorespa/ClientApp/configureStore.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/dotnetcorespa/ClientApp/configureStore.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./ClientApp/dist/bootstrap.css":
/*!**************************************!*\
  !*** ./ClientApp/dist/bootstrap.css ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./ClientApp/sass/site.scss":
/*!**********************************!*\
  !*** ./ClientApp/sass/site.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./ClientApp/store/About.ts":
/*!**********************************!*\
  !*** ./ClientApp/store/About.ts ***!
  \**********************************/
/*! exports provided: actionCreators, unloadedState, reducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actionCreators", function() { return actionCreators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unloadedState", function() { return unloadedState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducer", function() { return reducer; });
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
var actionCreators = {
    setAboutMarkDown: function (markdown) { return function (dispatch, getState) {
        dispatch({ type: 'SET_ABOUT_MARKDOWN', markdown: markdown.value });
    }; }
};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
var unloadedState = {
    isLoading: false,
    markdown: '<div></div>',
};
var reducer = function (state, action) {
    switch (action.type) {
        case 'SET_ABOUT_MARKDOWN':
            return {
                isLoading: false,
                markdown: action.markdown,
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            var exhaustiveCheck = action;
    }
    return state || unloadedState;
};


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/dotnetcorespa/ClientApp/store/About.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/dotnetcorespa/ClientApp/store/About.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./ClientApp/store/Search.ts":
/*!***********************************!*\
  !*** ./ClientApp/store/Search.ts ***!
  \***********************************/
/*! exports provided: actionCreators, unloadedState, reducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process, module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actionCreators", function() { return actionCreators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unloadedState", function() { return unloadedState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducer", function() { return reducer; });
/* harmony import */ var domain_task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! domain-task */ "./node_modules/domain-task/index.js");
/* harmony import */ var domain_task__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(domain_task__WEBPACK_IMPORTED_MODULE_0__);

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
var actionCreators = {
    setAirport: function (airport) { return function (dispatch, getState) {
        dispatch({ type: 'SET_AIRPORT', airport: airport });
    }; },
    setAirportFromUrl: function (path, actions) { return function (dispatch, getState) {
        try {
            var airportCode = path.split('/filter/')[1] ?
                path.split('/filter/')[1] :
                "ALL";
            for (var ap in getState()['search'].airports) {
                if (getState()['search'].airports[ap].code === airportCode) {
                    dispatch(actions.setAirport({
                        code: airportCode, name: getState()['search'][ap].name
                    }));
                }
            }
        }
        catch (e) {
            console.log(e.message);
        }
    }; },
    requestAirports: function () { return function (dispatch, getState) {
        var port = process.env.PORT ? ":" + process.env.PORT : ":80";
        var fetchTask = Object(domain_task__WEBPACK_IMPORTED_MODULE_0__["fetch"])("http://0.0.0.0" + port + "/api/search/airports")
            .then(function (response) { return response.json(); })
            .then(function (data) {
            dispatch({ type: 'RECEIVE_AIRPORT_SEARCH', airports: data });
        });
        Object(domain_task__WEBPACK_IMPORTED_MODULE_0__["addTask"])(fetchTask); // Ensure server-side prerendering waits for this to complete
        dispatch({ type: 'REQUEST_AIRPORT_SEARCH' });
    }; },
    requestFlights: function (airportCode, sort) { return function (dispatch, getState) {
        var fetchTask = Object(domain_task__WEBPACK_IMPORTED_MODULE_0__["fetch"])("/api/search/flights?code=" + airportCode + "&sort=" + sort.type)
            .then(function (response) { return response.json(); })
            .then(function (data) {
            dispatch({ type: 'RECEIVE_FLIGHT_SEARCH', flights: data });
        });
        Object(domain_task__WEBPACK_IMPORTED_MODULE_0__["addTask"])(fetchTask); // Ensure server-side prerendering waits for this to complete
        dispatch({ type: 'REQUEST_FLIGHT_SEARCH', sort: sort });
    }; },
    setSort: function (airportCode, sort) { return function (dispatch, getState) {
        dispatch({ type: 'SET_SORT', sort: sort });
    }; },
};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
var unloadedState = {
    airports: [],
    airport: { code: "ALL", name: "all locations" },
    flights: [],
    isLoading: false,
    sorts: [
        { type: "departs", label: "Departing" },
        { type: "flightNumber", label: "Flight number" },
        { type: "cabinPrice", label: "Price" },
    ],
    sort: { type: "flightNumber", label: "Flight Number" }
};
var reducer = function (state, action) {
    switch (action.type) {
        case 'SET_AIRPORT':
            return {
                airports: state.airports,
                airport: action.airport,
                flights: state.flights,
                isLoading: false,
                sorts: state.sorts,
                sort: state.sort,
            };
        case 'REQUEST_AIRPORT_SEARCH':
            return {
                airports: state.airports,
                airport: state.airport,
                flights: state.flights,
                isLoading: true,
                sorts: state.sorts,
                sort: state.sort,
            };
        case 'REQUEST_FLIGHT_SEARCH':
            return {
                airports: state.airports,
                airport: state.airport,
                flights: state.flights,
                isLoading: true,
                sorts: state.sorts,
                sort: state.sort,
            };
        case 'RECEIVE_AIRPORT_SEARCH':
            return {
                airports: action.airports,
                airport: state.airport,
                flights: state.flights,
                isLoading: false,
                sorts: state.sorts,
                sort: state.sort,
            };
        case 'RECEIVE_FLIGHT_SEARCH':
            return {
                airports: state.airports,
                airport: state.airport,
                flights: action.flights,
                isLoading: false,
                sorts: state.sorts,
                sort: state.sort,
            };
        case 'SET_SORT':
            return {
                airports: state.airports,
                airport: state.airport,
                flights: state.flights,
                isLoading: false,
                sorts: state.sorts,
                sort: action.sort,
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            var exhaustiveCheck = action;
    }
    return state || unloadedState;
};


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/dotnetcorespa/ClientApp/store/Search.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/dotnetcorespa/ClientApp/store/Search.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/node-libs-browser/node_modules/process/browser.js */ "./node_modules/node-libs-browser/node_modules/process/browser.js"), __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./ClientApp/store/index.ts":
/*!**********************************!*\
  !*** ./ClientApp/store/index.ts ***!
  \**********************************/
/*! exports provided: reducers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducers", function() { return reducers; });
/* harmony import */ var _Search__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Search */ "./ClientApp/store/Search.ts");
/* harmony import */ var _About__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./About */ "./ClientApp/store/About.ts");


// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
var reducers = {
    search: _Search__WEBPACK_IMPORTED_MODULE_0__["reducer"],
    about: _About__WEBPACK_IMPORTED_MODULE_1__["reducer"],
};


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/dotnetcorespa/ClientApp/store/index.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/dotnetcorespa/ClientApp/store/index.ts"); } } })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./node_modules/svg-url-loader/index.js?limit=1024!./ClientApp/plane.svg":
/*!**********************************************************************!*\
  !*** ./node_modules/svg-url-loader?limit=1024!./ClientApp/plane.svg ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\"data:image/svg+xml,module.exports = __webpack_public_path__ + 'plane.svg';\""

/***/ }),

/***/ 0:
/*!**************************************************************************************************************************************************************!*\
  !*** multi react-hot-loader/patch event-source-polyfill webpack-hot-middleware/client?path=__webpack_hmr&dynamicPublicPath=true ./ClientApp/boot-client.tsx ***!
  \**************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! react-hot-loader/patch */"./node_modules/react-hot-loader/patch.js");
__webpack_require__(/*! event-source-polyfill */"./node_modules/event-source-polyfill/src/eventsource.js");
__webpack_require__(/*! webpack-hot-middleware/client?path=__webpack_hmr&dynamicPublicPath=true */"./node_modules/webpack-hot-middleware/client.js?path=__webpack_hmr&dynamicPublicPath=true");
module.exports = __webpack_require__(/*! ./ClientApp/boot-client.tsx */"./ClientApp/boot-client.tsx");


/***/ }),

/***/ 1:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

/******/ });
//# sourceMappingURL=main-client.js.map