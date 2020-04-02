"use strict";
function gorillaClient() {
  return window["gorilla-client"];
}
function gorillaPlugins() {
  return window["gorilla-client"].plugins;
}
function installPlugin() {
  return window["gorilla-client"].plugins;
}
function lookaheadInitialise(container, frameClass, populateFn) {
  gorilla
    .gorillaPlugins()
    .lookahead.initialise(container, frameClass, populateFn);
}
function lookaheadLoad(batches) {
  gorilla.gorillaPlugins().lookahead.load(batches);
}
function lookaheadReady(batches, cb) {
  gorilla.gorillaPlugins().lookahead.ready(batches, cb);
}
function lookaheadReload(batch, key) {
  gorilla.gorillaPlugins().lookahead.reload(batch, key);
}
function lookaheadUnload(batch) {
  gorilla.gorillaPlugins().lookahead.unload(batch);
}
function lookaheadShow(batch, key) {
  gorilla.gorillaPlugins().lookahead.show(batch, key);
}
function lookaheadGetActiveSelector() {
  return gorilla.gorillaPlugins().lookahead.getActiveSelector();
}
function lookaheadClear() {
  return gorilla.gorillaPlugins().lookahead.clear();
}
function getParticipantID() {
  return gorilla.gorillaClient().participant.id;
}
function getScheduleID() {
  return gorilla.gorillaClient().schedule.id;
}
function manipulation(name, def) {
  return gorilla.gorillaClient().manipulation(name, def);
}
function store(name, value, global) {
  gorilla.gorillaClient().store(name, value, global);
}
function retrieve(name, def, global) {
  return gorilla.gorillaClient().retrieve(name, def, global);
}
function storeMany(values, global) {
  gorilla.gorillaClient().storeMany(values, global);
}
function startStopwatch() {
  gorilla.gorillaPlugins().timing.stopwatch.start();
}
function stopStopwatch() {
  gorilla.gorillaPlugins().timing.stopwatch.stop();
}
function readStopwatch(useClockTime) {
  return (
    void 0 === useClockTime && (useClockTime = !1),
    gorilla.gorillaPlugins().timing.stopwatch.read(useClockTime)
  );
}
function getStopwatch(useClockTime) {
  return (
    void 0 === useClockTime && (useClockTime = !1),
    gorilla.gorillaPlugins().timing.stopwatch.get(useClockTime)
  );
}
function addTimer(time, cb) {
  return gorilla.gorillaPlugins().timing.clock.addTimer(time, cb);
}
function removeTimer(id) {
  gorilla.gorillaPlugins().timing.clock.removeTimer(id);
}
function getRemainingTimeOnClock(id) {
  return gorilla.gorillaPlugins().timing.clock.getRemainingTime(id);
}
function initialiseTimer() {
  gorilla.gorillaPlugins().timing.clock.initialise();
}
function addTimerSequence() {
  return gorilla.gorillaPlugins().timing.addTimerSequence();
}
function getFrameRate() {
  return gorilla.gorillaPlugins().timing.clock.fps;
}
function setRandomSeed(seed) {
  return gorilla.gorillaPlugins().randomisation.legacy.setRandomSeed(seed);
}
function metric(results, key) {
  void 0 === key && (key = ""), gorilla.gorillaClient().metric(results, key);
}
function generateBlobUploadInfo(rowIndex, screenIndex, filename, format) {
  return gorilla
    .gorillaClient()
    .generateBlobUploadInfo(rowIndex, screenIndex, filename, format);
}
function uploadBlob(blob, filename, embeddedData) {
  return gorilla.gorillaClient().uploadBlob(blob, filename, embeddedData);
}
function functionQueueStart() {
  return gorilla.gorillaClient().functionQueueStart();
}
function functionQueueFinish(id) {
  return gorilla.gorillaClient().functionQueueFinish(id);
}
function eventSwitch() {
  gorilla.gorillaClient().eventSwitch();
}
function ready(f) {
  gorilla.gorillaClient().ready(f);
}
function run(cb) {
  cb();
}
function finish(overrideURL) {
  gorilla.gorillaClient().finish(overrideURL);
}
function populate(element, template, content) {
  gorilla.gorillaPlugins().content.populate(element, template, content);
}
function loadContent(element, cb) {
  gorilla.gorillaPlugins().content.loadContent(element, cb);
}
function populateAndLoad(element, template, content, cb) {
  gorilla
    .gorillaPlugins()
    .content.populateAndLoad(element, template, content, cb);
}
function stimuliURL(name) {
  return gorilla.gorillaClient().assetURL(name);
}
function resourceURL(name) {
  return gorilla.gorillaClient().assetURL(name);
}
function shuffle(array, seed) {
  return gorilla.gorillaPlugins().randomisation.legacy.shuffle(array, seed);
}
function injectVariables(text) {
  return gorilla.gorillaClient().injectVariables(text);
}
function responsiveFrame(container) {
  void 0 === container && (container = "#gorilla"),
    gorilla.gorillaPlugins().layout.responsiveFrame(container);
}
function refreshLayout(container) {
  void 0 === container && (container = "#gorilla"),
    gorilla.gorillaPlugins().layout.refreshLayout(container);
}
function updateLayout(container) {
  void 0 === container && (container = "#gorilla"),
    gorilla.gorillaPlugins().layout.refreshLayout(container);
}
function centerGorillaFrame() {
  gorilla.gorillaPlugins().layout.centerGorillaFrame();
}
function preventScrolling() {
  gorilla.gorillaPlugins().layout.preventScrolling();
}
function getElapsedTime() {
  return gorilla.gorillaClient().getElapsedTime();
}
function openDatastream(key) {
  return gorilla.gorillaPlugins().datastream.openDatastream(key);
}
Object.defineProperty(exports, "__esModule", {
  value: !0
});
var promise = require("bluebird"),
  moment = require("moment"),
  runtime = require("../../../../../../blueprint/client/public/blueprint/js/runtime"),
  browserUtils = require("../../../../../../blueprint/client/public/blueprint/js/browser_utils"),
  coreUtils = require("../../../../../../blueprint/client/public/blueprint/js/core_utils"),
  safeStore = require("../../../../../../blueprint/client/public/blueprint/js/safe_store"),
  GorillaFunctionQueue = (function() {
    function GorillaFunctionQueue(handler) {
      (this._queue = []), (this._handler = null), (this._handler = handler);
    }
    return (
      (GorillaFunctionQueue.prototype.start = function() {
        var id = coreUtils.generateShortcode();
        return this.queue.push(id), id;
      }),
      (GorillaFunctionQueue.prototype.finish = function(id) {
        for (var index = 0; index < this.queue.length; )
          this.queue[index] == id ? this.queue.splice(index, 1) : index++;
        this.finished && this.handler.functionQueueFinished();
      }),
      Object.defineProperty(GorillaFunctionQueue.prototype, "finished", {
        get: function() {
          return 0 == this.queue.length;
        },
        enumerable: !0,
        configurable: !0
      }),
      Object.defineProperty(GorillaFunctionQueue.prototype, "handler", {
        get: function() {
          return this._handler;
        },
        enumerable: !0,
        configurable: !0
      }),
      Object.defineProperty(GorillaFunctionQueue.prototype, "queue", {
        get: function() {
          return this._queue;
        },
        enumerable: !0,
        configurable: !0
      }),
      GorillaFunctionQueue
    );
  })();
exports.GorillaFunctionQueue = GorillaFunctionQueue;
var GorillaBlobQueue = (function() {
  function GorillaBlobQueue(key, participantID, scheduleID, handler) {
    (this._queue = []),
      (this._uploading = !1),
      (this._key = key),
      (this._participantID = participantID),
      (this._scheduleID = scheduleID),
      (this._handler = handler),
      this.load();
  }
  return (
    (GorillaBlobQueue.prototype.load = function() {
      var data = this.handler.blobQueueLoad(this.key);
      if (data && data.queue) {
        for (var i = 0; i < data.queue.length; i++)
          this._queue.push(data.queue[i]);
        this.upload();
      }
    }),
    (GorillaBlobQueue.prototype.save = function() {
      this.handler.blobQueueSave(this.key, {
        key: this.key,
        participant_id: this._participantID,
        schedule_id: this._scheduleID,
        queue: this._queue
      });
    }),
    (GorillaBlobQueue.prototype.add = function(data) {
      var _this = this;
      return browserUtils.blobToDataURL(data.blob).then(function(blobData) {
        var q = {
          blob_data: blobData,
          filename: data.filename,
          embedded_data: data.embedded_data
        };
        _this._queue.push(q), _this.save(), _this.upload();
      });
    }),
    (GorillaBlobQueue.prototype.upload = function() {
      !this.uploading &&
        this._queue.length > 0 &&
        ((this._uploading = !0), this.uploadBlob(this._queue[0]));
    }),
    (GorillaBlobQueue.prototype.uploadBlob = function(blob) {
      var _this = this,
        finished = !1;
      return (
        setTimeout(function() {
          finished || ((finished = !0), _this.uploadFinished());
        }, 1e4),
        runtime
          .apiAsync({
            url: this.handler.blobUploadURL(),
            method: "POST",
            data: {
              filename: blob.filename,
              schedule_id: this._scheduleID
            }
          })
          .then(function(result) {
            return result.success
              ? browserUtils.dataURLToBlob(blob.blob_data).then(function(b) {
                  return new promise(function(resolve, reject) {
                    var baseUrl = result.write_url,
                      indexOfQueryStart = baseUrl.indexOf("?"),
                      submitURL =
                        baseUrl.substring(0, indexOfQueryStart) +
                        "/" +
                        result.filename +
                        baseUrl.substring(indexOfQueryStart);
                    $.ajax({
                      url: submitURL,
                      type: "PUT",
                      data: b,
                      contentType: !1,
                      processData: !1,
                      beforeSend: function(xhr) {
                        xhr.setRequestHeader("x-ms-blob-type", "BlockBlob"),
                          xhr.setRequestHeader("Content-Type", b.type);
                      },
                      complete: function(data, status) {
                        resolve({
                          success: "success" == status
                        });
                      }
                    });
                  });
                })
              : promise.resolve({
                  success: !1
                });
          })
          .then(function(response) {
            return (
              finished ||
                ((finished = !0),
                response.success &&
                  (blob.embedded_data &&
                    _this.handler.blobSaveEmbeddedData(
                      _this._participantID,
                      blob.embedded_data.field,
                      blob.embedded_data.value
                    ),
                  _this._queue.shift(),
                  _this.save()),
                _this.uploadFinished()),
              promise.resolve(null)
            );
          })
          .catch(function(err) {
            setTimeout(function() {
              finished || ((finished = !0), _this.uploadFinished());
            }, 1e4);
          })
      );
    }),
    (GorillaBlobQueue.prototype.uploadFinished = function() {
      (this._uploading = !1),
        this.finished ? this.handler.blobQueueFinished() : this.upload();
    }),
    Object.defineProperty(GorillaBlobQueue.prototype, "finished", {
      get: function() {
        return 0 == this._queue.length && !this.uploading;
      },
      enumerable: !0,
      configurable: !0
    }),
    Object.defineProperty(GorillaBlobQueue.prototype, "uploading", {
      get: function() {
        return this._uploading;
      },
      enumerable: !0,
      configurable: !0
    }),
    Object.defineProperty(GorillaBlobQueue.prototype, "handler", {
      get: function() {
        return this._handler;
      },
      enumerable: !0,
      configurable: !0
    }),
    Object.defineProperty(GorillaBlobQueue.prototype, "key", {
      get: function() {
        return this._key;
      },
      enumerable: !0,
      configurable: !0
    }),
    GorillaBlobQueue
  );
})();
exports.GorillaBlobQueue = GorillaBlobQueue;
var GorillaMetricQueue = (function() {
  function GorillaMetricQueue(key, participantID, scheduleID, handler) {
    (this._queue = []),
      (this._uploading = !1),
      (this._uploadIndex = 0),
      (this._key = key),
      (this._participantID = participantID),
      (this._scheduleID = scheduleID),
      (this._handler = handler),
      this.load();
  }
  return (
    (GorillaMetricQueue.prototype.load = function() {
      var data = this.handler.metricQueueLoad(this.key);
      if (data && data.queue) {
        for (var i = 0; i < data.queue.length; i++)
          this._queue.push(data.queue[i]);
        this.upload();
      }
    }),
    (GorillaMetricQueue.prototype.save = function() {
      this.handler.metricQueueSave(this.key, {
        key: this.key,
        participant_id: this._participantID,
        schedule_id: this._scheduleID,
        queue: this._queue
      });
    }),
    (GorillaMetricQueue.prototype.add = function(data) {
      this._queue.push(data), this.save(), this.upload();
    }),
    (GorillaMetricQueue.prototype.upload = function() {
      if (!this.uploading && this._queue.length > 0) {
        (this._uploading = !0),
          (this._uploadIndex = Math.min(20, this._queue.length));
        for (var metrics = [], i = 0; i < this._uploadIndex; i++)
          metrics.push(this._queue[i]);
        this.uploadMetrics(metrics);
      }
    }),
    (GorillaMetricQueue.prototype.uploadMetrics = function(metrics) {
      var _this = this,
        finished = !1;
      return (
        setTimeout(function() {
          finished || ((finished = !0), _this.uploadFinished());
        }, 1e4),
        runtime
          .apiAsync({
            url: this.handler.metricUploadURL(),
            method: "POST",
            data: {
              participant_id: this._participantID,
              schedule_id: this._scheduleID,
              metrics: metrics
            },
            authenticated: !0
          })
          .then(function(response) {
            return (
              finished ||
                ((finished = !0),
                response.success &&
                  (_this._queue.splice(0, _this._uploadIndex), _this.save()),
                _this.uploadFinished()),
              promise.resolve(null)
            );
          })
          .catch(function(err) {
            setTimeout(function() {
              finished || ((finished = !0), _this.uploadFinished());
            }, 1e4);
          })
      );
    }),
    (GorillaMetricQueue.prototype.uploadFinished = function() {
      (this._uploading = !1),
        this.finished ? this.handler.metricQueueFinished() : this.upload();
    }),
    Object.defineProperty(GorillaMetricQueue.prototype, "finished", {
      get: function() {
        return 0 == this._queue.length && !this.uploading;
      },
      enumerable: !0,
      configurable: !0
    }),
    Object.defineProperty(GorillaMetricQueue.prototype, "uploading", {
      get: function() {
        return this._uploading;
      },
      enumerable: !0,
      configurable: !0
    }),
    Object.defineProperty(GorillaMetricQueue.prototype, "handler", {
      get: function() {
        return this._handler;
      },
      enumerable: !0,
      configurable: !0
    }),
    Object.defineProperty(GorillaMetricQueue.prototype, "key", {
      get: function() {
        return this._key;
      },
      enumerable: !0,
      configurable: !0
    }),
    GorillaMetricQueue
  );
})();
exports.GorillaMetricQueue = GorillaMetricQueue;
var Gorilla = (function() {
  function Gorilla() {
    (this._schedule = null),
      (this._session = null),
      (this._participant = null),
      (this._config = null),
      (this._participantDataKey = ""),
      (this._scheduleDataKey = ""),
      (this._metricToken = Math.round(1e6 * Math.random())),
      (this._startFuncs = []),
      (this._preview_return_url = ""),
      (this._startTime = 0),
      (this._domain = ""),
      (this._initialised = !1),
      (this._metricQueues = {}),
      (this._metricQueueSaveData = {}),
      (this._metricQueueCompleteCB = null),
      (this._blobQueues = {}),
      (this._blobQueueSaveData = {}),
      (this._blobQueueCompleteCB = null),
      (this._functionQueue = null),
      (this._functionQueueCompleteCB = null),
      this.configure("gorilla.js"),
      (this._functionQueue = new GorillaFunctionQueue(this));
  }
  return (
    (Gorilla.prototype.configure = function(scriptName) {
      var _this = this;
      $("script").each(function(index, elem) {
        var src = elem.src;
        src &&
          src.indexOf(scriptName) >= 0 &&
          (_this._domain = browserUtils.readDomainFromURL(src, !0));
      });
    }),
    (Gorilla.prototype.initialise = function(params) {
      var _this = this;
      if (!this._initialised) {
        (window.gorillaDebug = function(command) {
          "skip" == command && _this.finish();
        }),
          (this._schedule = params.schedule),
          (this._session = params.session),
          (this._participant = params.participant),
          (this._config = params.config),
          (this._preview_return_url = params.preview_return_url),
          (this._participantDataKey =
            "participant-" + this.participant.id + "-data"),
          (this._scheduleDataKey = "schedule-" + this.schedule.id + "-data");
        var participantDataURL = this.gorillaAPIURL("/data"),
          scheduleDataURL = this.gorillaAPIURL("/schedule/data");
        if (
          (safeStore.safeStoreRegister({
            key: this._participantDataKey,
            url: participantDataURL,
            method: "PUT",
            params: {},
            data: this.participant.data,
            authenticated: !0
          }),
          safeStore.safeStoreRegister({
            key: this._scheduleDataKey,
            url: scheduleDataURL,
            method: "PUT",
            params: {
              schedule_id: this.schedule.id
            },
            data: this.schedule.data,
            authenticated: !0
          }),
          sessionStorage)
        ) {
          var metricSaveData = sessionStorage.getItem("saved-metrics");
          if (metricSaveData)
            try {
              this._metricQueueSaveData = JSON.parse(metricSaveData);
            } catch (e) {
              this._metricQueueSaveData = {};
            }
          if (this._metricQueueSaveData)
            for (var x in this._metricQueueSaveData) {
              var q = this._metricQueueSaveData[x];
              q.participant_id == this.participant.id && q.queue.length > 0
                ? (this._metricQueues[q.key] = new GorillaMetricQueue(
                    q.key,
                    q.participant_id,
                    q.schedule_id,
                    this
                  ))
                : delete this._metricQueueSaveData[x];
            }
          var blobSaveData = sessionStorage.getItem("saved-blobs");
          if (blobSaveData)
            try {
              this._blobQueueSaveData = JSON.parse(blobSaveData);
            } catch (e) {
              this._blobQueueSaveData = {};
            }
          if (this._blobQueueSaveData)
            for (var x in this._blobQueueSaveData) {
              var b = this._blobQueueSaveData[x];
              b.participant_id == this.participant.id && b.queue.length > 0
                ? (this._blobQueues[b.key] = new GorillaBlobQueue(
                    b.key,
                    b.participant_id,
                    b.schedule_id,
                    this
                  ))
                : delete this._blobQueueSaveData[x];
            }
        }
      }
      this._initialised = !0;
    }),
    (Gorilla.prototype.run = function() {
      var _this = this;
      this.gorillaAPI({
        url: "/schedule/start",
        method: "POST",
        data: {
          schedule_id: this.schedule.id
        }
      }).then(function(response) {
        _this.start();
      });
    }),
    (Gorilla.prototype.manipulation = function(name, def) {
      return (
        (name = this.injectVariables(name)),
        name in this.config.manipulations
          ? this.config.manipulations[name]
          : def
      );
    }),
    (Gorilla.prototype.injectVariables = function(text) {
      var re = new RegExp("\\$\\${([^}]*)}", "i"),
        matches = null;
      do {
        (matches = re.exec(text)) &&
          (text = text.replace(matches[0], this.retrieve(matches[1], 0, !0)));
      } while (matches);
      return text;
    }),
    (Gorilla.prototype.store = function(name, value, global) {
      global = global || !1;
      var d = safeStore.safeStoreRetrieve(
        global ? this._participantDataKey : this._scheduleDataKey
      );
      (d.data[name] = value), d.sync();
    }),
    (Gorilla.prototype.storeMany = function(values, global) {
      global = global || !1;
      var d = safeStore.safeStoreRetrieve(
        global ? this._participantDataKey : this._scheduleDataKey
      );
      for (var x in values) d.data[x] = values[x];
      d.sync();
    }),
    (Gorilla.prototype.retrieve = function(name, def, global) {
      global = global || !1;
      var d = safeStore.safeStoreRetrieve(
        global ? this._participantDataKey : this._scheduleDataKey
      );
      return name in d.data ? d.data[name] : def;
    }),
    (Gorilla.prototype.metricQueueFinished = function() {
      if (this._metricQueueCompleteCB && this.metricQueuesComplete) {
        var cb = this._metricQueueCompleteCB;
        (this._metricQueueCompleteCB = null), cb();
      }
    }),
    (Gorilla.prototype.metricUploadURL = function() {
      return this.gorillaAPIURL("/metric");
    }),
    (Gorilla.prototype.metricQueueLoad = function(key) {
      return this._metricQueueSaveData[key];
    }),
    (Gorilla.prototype.metricQueueSave = function(key, data) {
      (this._metricQueueSaveData[key] = data),
        sessionStorage &&
          sessionStorage.setItem(
            "saved-metrics",
            JSON.stringify(this._metricQueueSaveData)
          );
    }),
    (Gorilla.prototype.blobQueueFinished = function() {
      if (this._blobQueueCompleteCB && this.blobQueuesComplete) {
        var cb = this._blobQueueCompleteCB;
        (this._blobQueueCompleteCB = null), cb();
      }
    }),
    (Gorilla.prototype.blobUploadURL = function() {
      return this.gorillaAPIURL("/upload");
    }),
    (Gorilla.prototype.blobQueueLoad = function(key) {
      return this._blobQueueSaveData[key];
    }),
    (Gorilla.prototype.blobQueueSave = function(key, data) {
      (this._blobQueueSaveData[key] = data),
        sessionStorage &&
          sessionStorage.setItem(
            "saved-blobs",
            JSON.stringify(this._blobQueueSaveData)
          );
    }),
    (Gorilla.prototype.blobSaveEmbeddedData = function(
      participantID,
      key,
      value
    ) {
      participantID == this.participant.id && this.store(key, value, !0);
    }),
    (Gorilla.prototype.functionQueueStart = function() {
      return this._functionQueue.start();
    }),
    (Gorilla.prototype.functionQueueFinish = function(id) {
      this._functionQueue.finish(id);
    }),
    (Gorilla.prototype.functionQueueFinished = function() {
      if (this._functionQueueCompleteCB) {
        var cb = this._functionQueueCompleteCB;
        (this._functionQueueCompleteCB = null), cb();
      }
    }),
    (Gorilla.prototype.metric = function(results, key) {
      void 0 === key && (key = "");
      var timestamp = (new Date(), Date.now()),
        timezone = -new Date().getTimezoneOffset() / 60,
        gorillaData = {
          user_agent: navigator.userAgent,
          screen_size: screen.width.toString() + "x" + screen.height.toString(),
          browser_size:
            $(window)
              .width()
              .toString() +
            "x" +
            $(window)
              .height()
              .toString()
        };
      (results.xgorilla = gorillaData), this._metricToken++;
      var metricQueueKey =
        "metric-queue-" + this.participant.id + "-" + this.schedule.id;
      metricQueueKey in this._metricQueues ||
        (this._metricQueues[metricQueueKey] = new GorillaMetricQueue(
          metricQueueKey,
          this.participant.id,
          this.schedule.id,
          this
        ));
      var metricData = {
        timestamp: timestamp,
        timezone: timezone,
        key: key,
        results_data: results,
        random_token: this._metricToken
      };
      this._metricQueues[metricQueueKey].add(metricData);
    }),
    (Gorilla.prototype.generateBlobUploadInfo = function(
      rowIndex,
      screenIndex,
      filename,
      format
    ) {
      var _this = this,
        filenameFull =
          filename +
          "-" +
          rowIndex.toString() +
          "-" +
          screenIndex.toString() +
          "." +
          format;
      return {
        filename: filenameFull,
        metricsURL:
          window.content.admin_host +
          "/uploads/schedule/" +
          this.schedule.id +
          "?filename=" +
          filenameFull,
        metricsFilename:
          (function(separator) {
            return (
              _this.participant.experiment_id +
              separator +
              _this.participant.experiment_version +
              separator +
              (_this.schedule.tree_node_key.length > 0
                ? _this.schedule.tree_node_key
                : "preview") +
              separator +
              _this.schedule.id +
              separator
            );
          })("-") + filenameFull
      };
    }),
    (Gorilla.prototype.uploadBlob = function(blob, filename, embeddedData) {
      var blobQueueKey =
        "blob-queue-" + this.participant.id + "-" + this.schedule.id;
      blobQueueKey in this._blobQueues ||
        (this._blobQueues[blobQueueKey] = new GorillaBlobQueue(
          blobQueueKey,
          this.participant.id,
          this.schedule.id,
          this
        )),
        this._blobQueues[blobQueueKey].add({
          blob: blob,
          filename: filename,
          embedded_data: embeddedData
        });
    }),
    (Gorilla.prototype.eventSwitch = function() {
      var _this = this;
      return this.gorillaAPI({
        url: "/event",
        method: "POST",
        data: {
          schedule_id: this.schedule.id,
          event: "switch",
          elapsed_time: Math.round(this.getElapsedTime())
        }
      }).then(function(response) {
        response.success &&
          response.handled &&
          _this.onUploadQueuesComplete(function() {
            safeStore.safeStoreFinish(function() {
              window.location.reload(!0);
            });
          });
      });
    }),
    (Gorilla.prototype.eventRedirect = function(scheduleID, url) {
      return this.gorillaAPI({
        url: "/schedule/" + scheduleID + "/event/redirect",
        method: "POST"
      }).then(function(response) {
        if (response.success)
          try {
            window.location.href = url;
          } catch (e) {
            alert(e);
          }
        else alert(response.message);
      });
    }),
    (Gorilla.prototype.ready = function(f) {
      this._startFuncs.push(f);
    }),
    (Gorilla.prototype.start = function() {
      var _this = this,
        timezone = this.retrieve("gorilla-timezone", null, !0);
      null == timezone &&
        ((timezone = moment.tz.guess()),
        this.store("gorilla-timezone", timezone, !0)),
        (this._startTime = window.performance.now());
      try {
        var timeLimit = parseInt(this.schedule.data.gorilla_time_limit);
        timeLimit > 0 &&
          setTimeout(function() {
            _this.finish();
          }, timeLimit);
      } catch (e) {}
      this.runStartFuncs();
    }),
    (Gorilla.prototype.runStartFuncs = function() {
      for (var i = 0; i < this._startFuncs.length; i++)
        console.log("Running Start Func"), this._startFuncs[i]();
    }),
    (Gorilla.prototype.assetURL = function(name) {
      return this.gorillaURL(
        "/task/" +
          this.schedule.task_id +
          "/" +
          this.schedule.task_version +
          "/asset/" +
          name
      );
    }),
    (Gorilla.prototype.finish = function(overrideURL) {
      var _this = this;
      this.onUploadQueuesComplete(function() {
        safeStore.safeStoreFinish(function() {
          _this
            .gorillaAPI({
              url: "/schedule/finish",
              method: "POST",
              data: {
                schedule_id: _this.schedule.id,
                elapsed_time: Math.round(_this.getElapsedTime())
              }
            })
            .then(function(result) {
              result.success ? _this.next() : alert(result.message);
            });
        });
      });
    }),
    (Gorilla.prototype.onNext = function(response, useStartPage) {
      var _this = this,
        redirectToStart = function() {
          useStartPage
            ? useStartPage()
            : (window.location.href = _this.gorillaURL("/participant"));
        };
      response.success
        ? response.participant_id &&
          response.schedule_id &&
          "task" == response.schedule_type
          ? response.schedule_url
            ? window.location.replace(response.schedule_url)
            : window.location.replace(
                this.gorillaURL("/task/" + response.participant_id)
              )
          : response.participant_id &&
            response.schedule_id &&
            "redirect" == response.schedule_type &&
            "" == response.schedule_data.redirection
          ? this.eventRedirect(response.schedule_id, response.schedule_data.url)
          : !response.is_debug && response.onward_url
          ? (window.location.href = response.onward_url)
          : !response.is_debug && response.experiment_onward_url
          ? (window.location.href = response.experiment_onward_url)
          : redirectToStart()
        : redirectToStart();
    }),
    (Gorilla.prototype.next = function() {
      var _this = this;
      this.gorillaAPI({
        url: "/next",
        method: "GET"
      }).then(function(response) {
        _this.onNext(response);
      });
    }),
    (Gorilla.prototype.gorillaURL = function(path) {
      return this._domain + path;
    }),
    (Gorilla.prototype.gorillaAPIURL = function(url) {
      return this.gorillaURL("/api/1/participant" + url);
    }),
    (Gorilla.prototype.gorillaAPI = function(params) {
      var url = this.gorillaAPIURL(params.url);
      return runtime
        .apiAsync({
          url: url,
          method: params.method,
          data: params.data,
          authenticated: !0
        })
        .then(function(response) {
          return promise.resolve(response);
        });
    }),
    (Gorilla.prototype.onUploadQueuesComplete = function(cb) {
      var _this = this;
      this.onMetricQueuesComplete(function() {
        _this.onBlobQueuesComplete(function() {
          _this.onFunctionQueueComplete(function() {
            cb();
          });
        });
      });
    }),
    (Gorilla.prototype.onMetricQueuesComplete = function(cb) {
      (this._metricQueueCompleteCB = null),
        this.metricQueuesComplete ? cb() : (this._metricQueueCompleteCB = cb);
    }),
    (Gorilla.prototype.onBlobQueuesComplete = function(cb) {
      (this._blobQueueCompleteCB = null),
        this.blobQueuesComplete ? cb() : (this._blobQueueCompleteCB = cb);
    }),
    (Gorilla.prototype.onFunctionQueueComplete = function(cb) {
      (this._functionQueueCompleteCB = null),
        this.functionQueueComplete
          ? cb()
          : (this._functionQueueCompleteCB = cb);
    }),
    (Gorilla.prototype.getElapsedTime = function() {
      return window.performance.now() - this._startTime;
    }),
    Object.defineProperty(Gorilla.prototype, "participant", {
      get: function() {
        return this._participant;
      },
      enumerable: !0,
      configurable: !0
    }),
    Object.defineProperty(Gorilla.prototype, "session", {
      get: function() {
        return this._session;
      },
      enumerable: !0,
      configurable: !0
    }),
    Object.defineProperty(Gorilla.prototype, "schedule", {
      get: function() {
        return this._schedule;
      },
      enumerable: !0,
      configurable: !0
    }),
    Object.defineProperty(Gorilla.prototype, "config", {
      get: function() {
        return this._config;
      },
      enumerable: !0,
      configurable: !0
    }),
    Object.defineProperty(Gorilla.prototype, "metricQueuesComplete", {
      get: function() {
        var complete = !0;
        for (var x in this._metricQueues)
          this._metricQueues[x].finished || (complete = !1);
        return complete;
      },
      enumerable: !0,
      configurable: !0
    }),
    Object.defineProperty(Gorilla.prototype, "blobQueuesComplete", {
      get: function() {
        var complete = !0;
        for (var x in this._blobQueues)
          this._blobQueues[x].finished || (complete = !1);
        return complete;
      },
      enumerable: !0,
      configurable: !0
    }),
    Object.defineProperty(Gorilla.prototype, "functionQueueComplete", {
      get: function() {
        return this._functionQueue.finished;
      },
      enumerable: !0,
      configurable: !0
    }),
    Gorilla
  );
})();
(exports.Gorilla = Gorilla),
  (exports.gorillaClient = gorillaClient),
  (exports.gorillaPlugins = gorillaPlugins),
  (window["gorilla-client"] = new Gorilla()),
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }),
  (exports.installPlugin = installPlugin),
  (window["gorilla-client"].plugins = {}),
  Object.defineProperty(exports, "__esModule", {
    value: !0
  });
var promise = require("bluebird"),
  runtime = require("../../../../../../blueprint/client/public/blueprint/js/runtime"),
  plugins = require("../core/plugins"),
  gorilla = require("../core/gorilla"),
  moment = require("moment"),
  GorillaAuthenticate = (function() {
    function GorillaAuthenticate() {
      (this._loggedIn = !1),
        (this._schedules = []),
        (this._openSchedules = []),
        (this._participant = null),
        (this._taskMismatch = !1),
        (this._payload = null);
    }
    return (
      (GorillaAuthenticate.prototype.run = function() {
        var _this = this,
          authData = {};
        gorilla
          .gorillaClient()
          .gorillaAPI({
            url: "/handshake",
            method: "POST",
            data: authData
          })
          .then(function(response) {
            return (
              response.success && response.logged_in && (_this._loggedIn = !0),
              _this.load()
            );
          })
          .then(function(result) {
            if (result) {
              if (
                ((_this._payload = result),
                window["task-id"] && window["task-version"])
              ) {
                var taskID = parseInt(window["task-id"]) || 0,
                  taskVersion = parseInt(window["task-version"]) || 0;
                0 == taskID ||
                  0 == taskVersion ||
                  (taskID == result.schedule.task_id &&
                    taskVersion == result.schedule.task_version) ||
                  (_this._taskMismatch = !0);
              }
              return promise.resolve(null);
            }
            return promise.resolve(null);
          })
          .then(function(result) {
            return _this.loggedIn && _this.isMaster
              ? gorilla.gorillaClient().gorillaAPI({
                  url: "/schedules/all",
                  method: "GET"
                })
              : promise.resolve(null);
          })
          .then(function(result) {
            if (result) {
              (_this._participant = result.participant),
                (_this._schedules = result.schedules);
              for (var i = 0; i < _this._schedules.length; i++)
                _this._schedules[i].completed ||
                  _this._openSchedules.push(_this._schedules[i]);
            }
            _this._payload && !_this.taskMismatch
              ? (gorilla.gorillaClient().initialise(_this._payload),
                gorilla.gorillaClient().run())
              : _this.isMaster
              ? gorilla.gorillaClient().runStartFuncs()
              : (window.location.href = gorilla
                  .gorillaClient()
                  .gorillaURL("/participant"));
          });
      }),
      (GorillaAuthenticate.prototype.load = function() {
        return promise.resolve().then(function(result) {
          var c = window.content;
          return c.participant && c.schedule && c.config
            ? promise.resolve({
                participant: c.participant,
                schedule: c.schedule,
                config: c.config,
                preview_return_url: c.preview_return_url
              })
            : gorilla
                .gorillaClient()
                .gorillaAPI({
                  url: "/load",
                  method: "GET"
                })
                .then(function(response) {
                  return response.success
                    ? ((c = c || {}),
                      (c.participant = response.participant),
                      (c.schedule = response.schedule),
                      (c.config = response.config),
                      (c.session = response.session),
                      (c.preview_return_url = response.preview_return_url),
                      promise.resolve({
                        participant: response.participant,
                        schedule: response.schedule,
                        session: response.session,
                        config: response.config,
                        preview_return_url: response.preview_return_url
                      }))
                    : promise.resolve(null);
                });
        });
      }),
      (GorillaAuthenticate.prototype.login = function(publicID) {
        return gorilla
          .gorillaClient()
          .gorillaAPI({
            url: "/authenticate",
            method: "POST",
            data: {
              public_id: publicID,
              access_code: this.accessCode,
              requirements: {
                connection_speed: 0
              },
              timezone: moment.tz.guess()
            }
          })
          .then(function(response) {
            response.success
              ? gorilla.gorillaClient().next()
              : alert(response.message);
          });
      }),
      (GorillaAuthenticate.prototype.logout = function() {
        return gorilla
          .gorillaClient()
          .gorillaAPI({
            url: "/logout",
            method: "POST"
          })
          .then(function(response) {
            window.location.reload();
          });
      }),
      (GorillaAuthenticate.prototype.createTask = function(
        name,
        manipulations
      ) {
        var _this = this;
        return gorilla
          .gorillaClient()
          .gorillaAPI({
            url: "/task",
            method: "POST",
            data: {
              name: name,
              manipulations: manipulations
            }
          })
          .then(function(response) {
            return (
              response.success
                ? (_this._schedules.push(response.schedule),
                  _this._openSchedules.push(response.schedule))
                : alert(response.message),
              promise.resolve(response.success)
            );
          });
      }),
      (GorillaAuthenticate.prototype.startTask = function() {
        if (this.openSchedule) {
          var url = this.openSchedule.url;
          (null != url && "" != url) ||
            (url =
              "/task/" +
              this.openSchedule.task_id +
              "/" +
              this.openSchedule.task_version),
            (window.location.href = url);
        } else alert("No open schedule");
      }),
      Object.defineProperty(GorillaAuthenticate.prototype, "isMaster", {
        get: function() {
          return window["gorilla-master"];
        },
        enumerable: !0,
        configurable: !0
      }),
      Object.defineProperty(GorillaAuthenticate.prototype, "loggedIn", {
        get: function() {
          return this._loggedIn;
        },
        enumerable: !0,
        configurable: !0
      }),
      Object.defineProperty(GorillaAuthenticate.prototype, "participant", {
        get: function() {
          return this._participant;
        },
        enumerable: !0,
        configurable: !0
      }),
      Object.defineProperty(GorillaAuthenticate.prototype, "hasOpenSchedules", {
        get: function() {
          return this._openSchedules && this._openSchedules.length > 0;
        },
        enumerable: !0,
        configurable: !0
      }),
      Object.defineProperty(GorillaAuthenticate.prototype, "schedules", {
        get: function() {
          return this._schedules;
        },
        enumerable: !0,
        configurable: !0
      }),
      Object.defineProperty(GorillaAuthenticate.prototype, "openSchedule", {
        get: function() {
          return this._openSchedules.length > 0 ? this._openSchedules[0] : null;
        },
        enumerable: !0,
        configurable: !0
      }),
      Object.defineProperty(GorillaAuthenticate.prototype, "openSchedules", {
        get: function() {
          return this._openSchedules;
        },
        enumerable: !0,
        configurable: !0
      }),
      Object.defineProperty(GorillaAuthenticate.prototype, "taskMismatch", {
        get: function() {
          return this._taskMismatch;
        },
        enumerable: !0,
        configurable: !0
      }),
      Object.defineProperty(GorillaAuthenticate.prototype, "accessCode", {
        get: function() {
          return window.content.access_code;
        },
        enumerable: !0,
        configurable: !0
      }),
      GorillaAuthenticate
    );
  })();
(exports.GorillaAuthenticate = GorillaAuthenticate),
  (plugins.installPlugin().auth = new GorillaAuthenticate()),
  runtime.start(function() {
    gorilla.gorillaPlugins().auth.run();
  }),
  Object.defineProperty(exports, "__esModule", {
    value: !0
  });
var plugins = require("../core/plugins"),
  Content = (function() {
    function Content() {}
    return (
      (Content.prototype.populate = function(element, template, content) {
        var html = "";
        template &&
          ((content = content || {}),
          (html = Handlebars.templates[template](content))),
          $(element).html(html);
      }),
      (Content.prototype.loadContent = function(element, cb) {
        var videosToLoad = 0,
          audioToLoad = 0,
          imagesToLoad = 0,
          iframesToLoad = 0,
          imagesLoaded = !1,
          youtubeToLoad = 0,
          youtubePlayers = [],
          timeout = null,
          run = !1,
          checkIfReady = function() {
            videosToLoad <= 0 &&
              (imagesLoaded || imagesToLoad <= 0) &&
              iframesToLoad <= 0 &&
              audioToLoad <= 0 &&
              youtubeToLoad <= 0 &&
              (run || (clearTimeout(timeout), (timeout = null), cb(null)),
              (run = !0));
          },
          iOS =
            /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        $(element)
          .find("video")
          .each(function(index, elem) {
            iOS ||
              (videosToLoad++,
              $(elem).on("loadeddata", function() {
                videosToLoad--, checkIfReady();
              }),
              $(elem)
                .find("source")
                .on("error", function(event) {
                  videosToLoad--, checkIfReady();
                }));
          }),
          $(element)
            .find("audio")
            .each(function(index, elem) {
              iOS ||
                ((($(elem).attr("src") && $(elem).attr("src").length) ||
                  ($(elem)
                    .find("source")
                    .attr("src") &&
                    $(elem)
                      .find("source")
                      .attr("src").length)) &&
                  (audioToLoad++,
                  $(elem).on("loadeddata", function() {
                    audioToLoad--, checkIfReady();
                  }),
                  $(elem)
                    .find("source")
                    .on("error", function(event) {
                      audioToLoad--, checkIfReady();
                    })));
            }),
          $(element)
            .find("iframe")
            .each(function(index, elem) {
              iframesToLoad++,
                $(elem).on("load", function() {
                  iframesToLoad--, checkIfReady();
                });
            }),
          $(element)
            .find("img")
            .each(function(index, elem) {
              imagesToLoad++;
            }),
          $(element)
            .imagesLoaded()
            .always(function() {
              (imagesLoaded = !0), checkIfReady();
            }),
          $(element)
            .find(".youtubeAPI")
            .each(function(index, elem) {
              function onPlayerReady(event) {
                var embedCode = $(event.target.a).data("embed-id");
                event.target.cueVideoById(embedCode);
              }
              function onStateChange(event) {
                event.data == window.YT.PlayerState.CUED &&
                  (youtubeToLoad--, checkIfReady());
              }
              youtubeToLoad++,
                youtubePlayers.push(
                  new window.YT.Player(elem, {
                    events: {
                      onReady: onPlayerReady,
                      onStateChange: onStateChange
                    }
                  })
                );
            }),
          (timeout = setTimeout(function() {
            run || cb("Timed out waiting for images/videos to load"),
              (run = !0),
              (timeout = null);
          }, 3e4));
      }),
      (Content.prototype.populateAndLoad = function(
        element,
        template,
        content,
        cb
      ) {
        this.populate(element, template, content),
          this.loadContent(element, cb);
      }),
      Content
    );
  })();
(exports.Content = Content),
  (plugins.installPlugin().content = new Content()),
  Object.defineProperty(exports, "__esModule", {
    value: !0
  });
var plugins = require("../core/plugins"),
  Layout = (function() {
    function Layout() {}
    return (
      (Layout.prototype.responsiveFrame = function(container) {
        var _this = this;
        void 0 === container && (container = "#gorilla"),
          this.refreshLayout(container),
          $(window).on("resize", function(event) {
            _this.refreshLayout(container);
          });
      }),
      (Layout.prototype.refreshLayout = function(container) {
        void 0 === container && (container = "#gorilla"),
          this.centerGorillaFrame(),
          this.updateLayout(container);
      }),
      (Layout.prototype.updateLayout = function(container) {
        void 0 === container && (container = "#gorilla");
        var frameWidth = $(container).width(),
          frameHeight = $(container).height();
        $(container + " .gorilla-fit-text").each(function(index, elem) {
          $(elem)
            .children()
            .each(function(i, e) {
              var origSize = $(e).data("original-size"),
                origLineHeight = $(e).data("original-line-height");
              if (origSize)
                $(e).css("font-size", origSize.toString() + "px"),
                  origLineHeight &&
                    $(e).css("line-height", origLineHeight.toString() + "px");
              else {
                var sz = $(e)
                  .css("font-size")
                  .replace("px", "");
                $(e).data("original-size", sz);
                var lh = $(e)
                  .css("line-height")
                  .replace("px", "");
                $(e).data("original-line-height", lh);
              }
            });
        });
        var fixDimension = function(e, dim, total) {
          var prop = $(e).data(dim),
            val = 0;
          if (prop.indexOf("%") >= 0) {
            var p = parseInt(prop.replace("%", "")) / 100;
            val = Math.round(p * total);
          }
          $(e).css(dim, val);
        };
        $(container + " .gorilla-zone").each(function(i, e) {
          $(e).css("position", "absolute"),
            fixDimension(e, "left", frameWidth),
            fixDimension(e, "right", frameWidth),
            fixDimension(e, "top", frameHeight),
            fixDimension(e, "bottom", frameHeight);
        }),
          $(container + " .gorilla-expand").each(function(i, e) {
            var parent = $(e).parent();
            if (parent) {
              var maxWidth = parent.width(),
                maxHeight = parent.height();
              $(e).css("width", maxWidth), $(e).css("height", maxHeight);
            }
          }),
          $(container + " .gorilla-fit").each(function(i, e) {
            var parent = $(e).parent();
            if (parent) {
              var maxWidth = parent.width(),
                maxHeight = parent.height();
              $(e).css("max-width", maxWidth),
                $(e).css("max-height", maxHeight);
            }
          }),
          $(container + " .gorilla-float").each(function(i, e) {
            var parent = $(e).parent();
            if (parent) {
              "none" != $(e).css("display") &&
                $(e).css("display", "inline-block");
              var maxWidth = parent.width(),
                maxHeight = parent.height(),
                offsetX = Math.max(0, (maxWidth - $(e).width()) / 2),
                offsetY = Math.max(0, (maxHeight - $(e).height()) / 2);
              $(e).css("position", "relative"),
                $(e).css("margin", "0"),
                $(e).css("left", offsetX),
                $(e).css("top", offsetY);
            }
          }),
          $(container + " .gorilla-abs-float").each(function(i, e) {
            var parent = $(e).parent();
            if (parent) {
              "none" != $(e).css("display") &&
                $(e).css("display", "inline-block");
              var maxWidth = parent.width(),
                maxHeight = parent.height(),
                offsetX = Math.max(0, (maxWidth - $(e).width()) / 2),
                offsetY = Math.max(0, (maxHeight - $(e).height()) / 2);
              $(e).css("position", "absolute"),
                $(e).css("margin", "0"),
                $(e).css("left", offsetX),
                $(e).css("top", offsetY);
            }
          }),
          $(container + " .gorilla-float-centre").each(function(i, e) {
            var parent = $(e).parent();
            if (parent) {
              "none" != $(e).css("display") &&
                $(e).css("display", "inline-block");
              var maxWidth = parent.width(),
                maxHeight = parent.height(),
                offsetX = (maxWidth - $(e).width()) / 2,
                offsetY = (maxHeight - $(e).height()) / 2;
              $(e).css("position", "absolute"),
                $(e).css("margin", "0"),
                $(e).css("left", offsetX),
                $(e).css("top", offsetY);
            }
          });
        var squash = function(elem, maxHeight, pc) {
          if (((pc = pc || 0.9), $(elem).height() > maxHeight && pc >= 0.2))
            $(elem)
              .children()
              .each(function(i, e) {
                var origSize = parseInt($(e).data("original-size"));
                if (origSize) {
                  $(e).css(
                    "font-size",
                    Math.floor(origSize * pc).toString() + "px"
                  );
                  var origLineHeight = parseInt(
                    $(e).data("original-line-height")
                  );
                  origLineHeight &&
                    $(e).css(
                      "line-height",
                      Math.floor(origLineHeight * pc).toString() + "px"
                    );
                }
              }),
              squash(elem, maxHeight, pc - 0.05);
          else if (pc < 0.9) {
            var delta = Math.max(0, maxHeight - $(elem).height());
            $(elem).css("top", (delta / 2).toString() + "px");
          }
        };
        $(container + " .gorilla-fit-text").each(function(i, e) {
          var maxHeight = $(e)
            .parent()
            .height();
          squash(e, maxHeight);
        });
      }),
      (Layout.prototype.centerGorillaFrame = function() {
        var frame = $(".gorilla-frame-responsive"),
          availableWidth = frame.parent().width(),
          availableHeight = frame.parent().height();
        frame.css("overflow-x", "hidden"), frame.css("overflow-y", "hidden");
        var aspectRatio = {
            x: 4,
            y: 3
          },
          limitHeight =
            availableHeight / aspectRatio.y > availableWidth / aspectRatio.x,
          width = availableWidth,
          height = availableHeight;
        limitHeight
          ? (height = (availableWidth / aspectRatio.x) * aspectRatio.y)
          : (width = (availableHeight / aspectRatio.y) * aspectRatio.x),
          frame.width(width),
          frame.height(height),
          frame.offset({
            left: (availableWidth - width) / 2,
            top: (availableHeight - height) / 2
          });
      }),
      (Layout.prototype.preventScrolling = function() {
        $(document).on("touchmove", function(e) {
          e.preventDefault();
        });
      }),
      Layout
    );
  })();
(exports.Layout = Layout),
  (plugins.installPlugin().layout = new Layout()),
  Object.defineProperty(exports, "__esModule", {
    value: !0
  });
var plugins = require("../core/plugins"),
  Lookahead = (function() {
    function Lookahead() {
      (this._container = ""),
        (this._frameClass = ""),
        (this._cache = {}),
        (this._frameIndex = 0),
        (this._frameShow = 0),
        (this._populateFn = null),
        (this._callback = null);
    }
    return (
      (Lookahead.prototype.initialise = function(
        container,
        frameClass,
        populateFn
      ) {
        (this._container = container),
          (this._frameClass = frameClass),
          (this._populateFn = populateFn);
      }),
      (Lookahead.prototype.load = function(batches) {
        for (var x in this._cache) {
          for (var found = !1, i = 0; i < batches.length; i++)
            if (x == batches[i].batch) {
              found = !0;
              break;
            }
          found || this.unload(x);
        }
        for (var i = 0; i < batches.length; i++) {
          var found = !1;
          for (var x in this._cache)
            if (x == batches[i].batch) {
              found = !0;
              break;
            }
          if (!found) {
            this._cache[batches[i].batch] = [];
            for (var j = 0; j < batches[i].screens.length; j++) {
              var index = this.appendFrame();
              this._cache[batches[i].batch].push({
                key: batches[i].screens[j].key,
                context: batches[i].screens[j].context,
                frameIndex: index,
                loaded: !1,
                loading: !1
              }),
                this.populate(batches[i].batch, batches[i].screens[j].key);
            }
          }
        }
      }),
      (Lookahead.prototype.ready = function(batches, cb) {
        (this._callback = {
          batches: batches,
          cb: cb
        }),
          this.checkReady();
      }),
      (Lookahead.prototype.reload = function(batch, key) {
        this.populate(batch, key);
      }),
      (Lookahead.prototype.unload = function(batch) {
        if (batch in this._cache) {
          for (var i = 0; i < this._cache[batch].length; i++)
            $(this.getFrame(this._cache[batch][i].frameIndex)).remove();
          delete this._cache[batch];
        }
      }),
      (Lookahead.prototype.clear = function() {
        (this._cache = {}), $(this._container).html("");
      }),
      (Lookahead.prototype.show = function(batch, key) {
        var _this = this,
          screen = this.findScreenInCache(batch, key);
        $(".lookahead-frame").each(function(index, elem) {
          parseInt($(elem).data("index")) == screen.frameIndex
            ? ($(elem).show(), (_this._frameShow = screen.frameIndex))
            : $(elem).hide();
        });
      }),
      (Lookahead.prototype.getActiveSelector = function() {
        return this.getFrameSelector(this._frameShow);
      }),
      (Lookahead.prototype.checkReady = function() {
        if (this._callback) {
          for (var ready = !0, i = 0; i < this._callback.batches.length; i++) {
            var b = this._callback.batches[i];
            if (b in this._cache)
              for (var j = 0; j < this._cache[b].length; j++)
                if (!this._cache[b][j].loaded) {
                  ready = !1;
                  break;
                }
            if (!ready) break;
          }
          if (ready) {
            var f = this._callback.cb;
            (this._callback = null), f();
          }
        }
      }),
      (Lookahead.prototype.findScreenInCache = function(batch, key) {
        var screen = null;
        if (batch in this._cache)
          for (var i = 0; i < this._cache[batch].length; i++)
            if (this._cache[batch][i].key == key) {
              screen = this._cache[batch][i];
              break;
            }
        return screen;
      }),
      (Lookahead.prototype.populate = function(batch, key) {
        var _this = this,
          screen = this.findScreenInCache(batch, key);
        screen &&
          ((screen.loading = !0),
          this._populateFn(
            batch,
            screen.key,
            screen.context,
            this.getFrameSelector(screen.frameIndex),
            function() {
              (screen.loading = !1), (screen.loaded = !0), _this.checkReady();
            }
          ));
      }),
      (Lookahead.prototype.appendFrame = function() {
        var index = this._frameIndex++;
        return (
          $(this._container).append(
            '<div class="lookahead-frame ' +
              this._frameClass +
              '" data-index="' +
              index +
              '" style="display:none"></div>'
          ),
          index
        );
      }),
      (Lookahead.prototype.getFrameSelector = function(index) {
        return '.lookahead-frame[data-index="' + index + '"]';
      }),
      (Lookahead.prototype.getFrame = function(index) {
        return $(this.getFrameSelector(index));
      }),
      Lookahead
    );
  })();
(exports.Lookahead = Lookahead),
  (plugins.installPlugin().lookahead = new Lookahead()),
  Object.defineProperty(exports, "__esModule", {
    value: !0
  });
var plugins = require("../core/plugins"),
  Dice = (function() {
    function Dice(seed) {
      (this._rng = null), (this._rng = new Math.seedrandom(seed));
    }
    return (
      (Dice.prototype.roll = function(sides) {
        return Math.ceil(this.random() * sides);
      }),
      (Dice.prototype.rollZ = function(sides) {
        return Math.floor(this.random() * sides);
      }),
      (Dice.prototype.random = function() {
        return this._rng();
      }),
      (Dice.prototype.shuffle = function(array) {
        for (var temp, index, counter = array.length; counter > 0; )
          (index = this.rollZ(counter)),
            counter--,
            (temp = array[counter]),
            (array[counter] = array[index]),
            (array[index] = temp);
        return array;
      }),
      Dice
    );
  })();
(exports.Dice = Dice),
  (plugins.installPlugin().randomisation = {
    dice: function(seed) {
      return new Dice(seed);
    },
    random: function(seed) {
      return new Dice(seed).random();
    },
    shuffle: function(array, seed) {
      return new Dice(seed).shuffle(array);
    },
    legacy: {
      setRandomSeed: function(seed) {
        Math.seedrandom(seed);
      },
      shuffle: function(array, seed) {
        seed && Math.seedrandom(seed);
        for (var temp, index, counter = array.length; counter > 0; )
          (index = Math.floor(Math.random() * counter)),
            counter--,
            (temp = array[counter]),
            (array[counter] = array[index]),
            (array[index] = temp);
        return array;
      }
    }
  }),
  Object.defineProperty(exports, "__esModule", {
    value: !0
  });
var runtime = require("../../../../../../blueprint/client/public/blueprint/js/runtime"),
  plugins = require("../core/plugins"),
  g_clock = null,
  Stopwatch = (function() {
    function Stopwatch() {
      (this._stopwatch = 0),
        (this._stopwatchClock = 0),
        (this._stopwatchStopped = !1);
    }
    return (
      (Stopwatch.prototype.start = function() {
        (this._stopwatch = window.performance.now()),
          (this._stopwatchClock = g_clock.time),
          (this._stopwatchStopped = !1);
      }),
      (Stopwatch.prototype.stop = function() {
        (this._stopwatch = this.read()),
          (this._stopwatchClock = this.read(!0)),
          (this._stopwatchStopped = !0);
      }),
      (Stopwatch.prototype.read = function(useClockTime) {
        return (
          void 0 === useClockTime && (useClockTime = !1),
          useClockTime
            ? (0 == this._stopwatchClock &&
                (this._stopwatchClock = g_clock.startTime),
              g_clock.time - this._stopwatchClock)
            : window.performance.now() - this._stopwatch
        );
      }),
      (Stopwatch.prototype.get = function(useClockTime) {
        return (
          void 0 === useClockTime && (useClockTime = !1),
          this._stopwatchStopped ||
            runtime.error("Getting stopwatch without stopping it first!"),
          useClockTime ? this._stopwatchClock : this._stopwatch
        );
      }),
      Stopwatch
    );
  })();
exports.Stopwatch = Stopwatch;
var Clock = (function() {
  function Clock() {
    (this._startTime = 0),
      (this._time = 0),
      (this._timers = []),
      (this._timerID = 0),
      (this._initialised = !1),
      (this._fps = 0);
  }
  return (
    (Clock.prototype.addTimer = function(time, cb) {
      return (
        this._timerID++,
        this._timers.push({
          cb: cb,
          remaining: time,
          id: this._timerID
        }),
        this._timerID
      );
    }),
    (Clock.prototype.removeTimer = function(id) {
      for (var i = 0; i < this._timers.length; i++)
        this._timers[i].id == id && this._timers.splice(i, 1);
    }),
    (Clock.prototype.getRemainingTime = function(id) {
      for (var i = 0; i < this._timers.length; i++)
        if (this._timers[i].id == id) return this._timers[i].remaining;
      return 0;
    }),
    (Clock.prototype.initialise = function() {
      var _this = this;
      if (!this._initialised) {
        this._initialised = !0;
        var oldClockTime = 0,
          intervalHistory = [],
          first = !0,
          cb = function(timestamp) {
            requestAnimationFrame(cb),
              (_this._time = timestamp),
              first && ((_this._startTime = _this._time), (first = !1)),
              0 == oldClockTime && (oldClockTime = _this._time);
            var interval = _this._time - oldClockTime;
            for (
              oldClockTime = _this._time, intervalHistory.unshift(interval);
              intervalHistory.length > 180;

            )
              intervalHistory.pop();
            var intervalProjection = 0;
            if (intervalHistory.length >= 60) {
              for (
                var modeValues = {}, i = 0;
                i < intervalHistory.length;
                i++
              ) {
                var t = intervalHistory[i],
                  k = "mode-" + t.toString();
                k in modeValues ||
                  (modeValues[k] = {
                    val: t,
                    count: 0
                  }),
                  modeValues[k].count++;
              }
              var mode = 0,
                highest = 0;
              for (var x in modeValues)
                modeValues[x].count > highest &&
                  ((highest = modeValues[x].count), (mode = modeValues[x].val));
              (intervalProjection = mode),
                (_this._fps = Math.round(1e3 / intervalProjection));
            }
            for (
              var i = 0, numTimers = _this._timers.length, timersToRemove = [];
              i < numTimers && i < _this._timers.length;

            )
              (_this._timers[i].remaining -= interval),
                (_this._timers[i].remaining <= 0 ||
                  (intervalProjection > 0 &&
                    _this._timers[i].remaining < intervalProjection / 2)) &&
                  (timersToRemove.push(_this._timers[i].id),
                  _this._timers[i].cb()),
                i++;
            for (var i = 0; i < timersToRemove.length; i++)
              _this.removeTimer(timersToRemove[i]);
          };
        requestAnimationFrame(cb);
      }
    }),
    Object.defineProperty(Clock.prototype, "time", {
      get: function() {
        return this._time;
      },
      enumerable: !0,
      configurable: !0
    }),
    Object.defineProperty(Clock.prototype, "startTime", {
      get: function() {
        return this._startTime;
      },
      enumerable: !0,
      configurable: !0
    }),
    Object.defineProperty(Clock.prototype, "fps", {
      get: function() {
        return this._fps;
      },
      enumerable: !0,
      configurable: !0
    }),
    Clock
  );
})();
exports.Clock = Clock;
var TimerSequence = (function() {
  function TimerSequence() {
    (this._queue = []), (this._active = 0), g_clock.initialise();
  }
  return (
    (TimerSequence.prototype.delay = function(time) {
      return (
        this._queue.push({
          cb: null,
          time: time
        }),
        this
      );
    }),
    (TimerSequence.prototype.then = function(cb) {
      return (
        this._queue.push({
          cb: cb,
          time: 0
        }),
        this
      );
    }),
    (TimerSequence.prototype.run = function() {
      var _this = this;
      if (this._queue.length > 0) {
        var q = this._queue.shift();
        q.time > 0
          ? (this._active = g_clock.addTimer(q.time, function() {
              (_this._active = 0), q.cb && q.cb(), _this.run();
            }))
          : (q.cb && q.cb(), this.run());
      }
      return this;
    }),
    (TimerSequence.prototype.cancel = function() {
      g_clock.removeTimer(this._active), (this._queue = []);
    }),
    (TimerSequence.prototype.getRemainingSequenceTime = function() {
      var remainingTime = 0,
        activeID = this._active;
      remainingTime = g_clock.getRemainingTime(activeID);
      for (var i = 0; i < this._queue.length; i++)
        remainingTime += this._queue[i].time;
      return remainingTime;
    }),
    TimerSequence
  );
})();
(exports.TimerSequence = TimerSequence),
  (g_clock = new Clock()),
  (plugins.installPlugin().timing = {
    clock: g_clock,
    stopwatch: new Stopwatch(),
    addTimerSequence: function() {
      return new TimerSequence();
    }
  }),
  Object.defineProperty(exports, "__esModule", {
    value: !0
  });
var runtime = require("../../../../../../blueprint/client/public/blueprint/js/runtime"),
  browserUtils = require("../../../../../../blueprint/client/public/blueprint/js/browser_utils"),
  plugins = require("../core/plugins"),
  gorilla = require("../core/gorilla"),
  sheetjs = window.XLSX,
  Datastream = (function() {
    function Datastream(key) {
      (this._key = null),
        (this._titles = []),
        (this._data = []),
        (this._key = key),
        this.loadFromStorage();
    }
    return (
      (Datastream.prototype.append = function(data) {
        this._data.push(data), this.saveToStorage();
      }),
      (Datastream.prototype.upload = function(filename, format) {
        browserUtils
          .generateSpreadsheetInWorker(this.titles, this.data)
          .then(function(blob) {
            blob
              ? gorilla.gorillaClient().uploadBlob(blob, filename)
              : runtime.error(
                  "Error creating spreadsheet from datastream",
                  null
                );
          }),
          (this._titles = []),
          (this._data = []),
          this.saveToStorage();
      }),
      (Datastream.prototype.saveToStorage = function() {
        if (sessionStorage) {
          var streams = sessionStorage.getItem("datastreams"),
            s = {};
          if (streams)
            try {
              s = JSON.parse(streams);
            } catch (e) {
              s = {};
            }
          (s[this.key] = {
            titles: this._titles,
            data: this._data
          }),
            (streams = JSON.stringify(s)),
            sessionStorage.setItem("datastreams", streams);
        }
      }),
      (Datastream.prototype.loadFromStorage = function() {
        if (sessionStorage) {
          var streams = sessionStorage.getItem("datastreams");
          if (streams)
            try {
              var s = JSON.parse(streams);
              if (this.key in s) {
                var storedStream = s[this.key];
                (this._titles = storedStream.titles),
                  (this._data = storedStream.data);
              }
            } catch (e) {
              (this._titles = []), (this._data = []);
            }
        }
      }),
      Object.defineProperty(Datastream.prototype, "titles", {
        get: function() {
          return this._titles;
        },
        set: function(titles) {
          (this._titles = titles), this.saveToStorage();
        },
        enumerable: !0,
        configurable: !0
      }),
      Object.defineProperty(Datastream.prototype, "key", {
        get: function() {
          return this._key;
        },
        enumerable: !0,
        configurable: !0
      }),
      Object.defineProperty(Datastream.prototype, "data", {
        get: function() {
          return this._data;
        },
        enumerable: !0,
        configurable: !0
      }),
      Datastream
    );
  })();
exports.Datastream = Datastream;
var g_datastreams = {};
(plugins.installPlugin().datastream = {
  openDatastream: function(key) {
    return (
      key in g_datastreams || (g_datastreams[key] = new Datastream(key)),
      g_datastreams[key]
    );
  }
}),
  Object.defineProperty(exports, "__esModule", {
    value: !0
  });
var gorilla = require("./core/gorilla");
(exports.lookaheadInitialise = lookaheadInitialise),
  (exports.lookaheadLoad = lookaheadLoad),
  (exports.lookaheadReady = lookaheadReady),
  (exports.lookaheadReload = lookaheadReload),
  (exports.lookaheadUnload = lookaheadUnload),
  (exports.lookaheadShow = lookaheadShow),
  (exports.lookaheadGetActiveSelector = lookaheadGetActiveSelector),
  (exports.lookaheadClear = lookaheadClear),
  (exports.getParticipantID = getParticipantID),
  (exports.getScheduleID = getScheduleID),
  (exports.manipulation = manipulation),
  (exports.store = store),
  (exports.retrieve = retrieve),
  (exports.storeMany = storeMany),
  (exports.startStopwatch = startStopwatch),
  (exports.stopStopwatch = stopStopwatch),
  (exports.readStopwatch = readStopwatch),
  (exports.getStopwatch = getStopwatch),
  (exports.addTimer = addTimer),
  (exports.removeTimer = removeTimer),
  (exports.getRemainingTimeOnClock = getRemainingTimeOnClock),
  (exports.initialiseTimer = initialiseTimer),
  (exports.addTimerSequence = addTimerSequence),
  (exports.getFrameRate = getFrameRate),
  (exports.setRandomSeed = setRandomSeed),
  (exports.metric = metric),
  (exports.generateBlobUploadInfo = generateBlobUploadInfo),
  (exports.uploadBlob = uploadBlob),
  (exports.functionQueueStart = functionQueueStart),
  (exports.functionQueueFinish = functionQueueFinish),
  (exports.eventSwitch = eventSwitch),
  (exports.ready = ready),
  (exports.run = run),
  (exports.finish = finish),
  (exports.populate = populate),
  (exports.loadContent = loadContent),
  (exports.populateAndLoad = populateAndLoad),
  (exports.stimuliURL = stimuliURL),
  (exports.resourceURL = resourceURL),
  (exports.shuffle = shuffle),
  (exports.injectVariables = injectVariables),
  (exports.responsiveFrame = responsiveFrame),
  (exports.refreshLayout = refreshLayout),
  (exports.updateLayout = updateLayout),
  (exports.centerGorillaFrame = centerGorillaFrame),
  (exports.preventScrolling = preventScrolling),
  (exports.getElapsedTime = getElapsedTime),
  (exports.openDatastream = openDatastream),
  (function() {
    var c = window.content;
    c.participant &&
      c.schedule &&
      c.config &&
      gorilla.gorillaClient().initialise({
        participant: c.participant,
        schedule: c.schedule,
        session: c.session,
        config: c.config,
        preview_return_url: c.preview_return_url
      });
  })();
