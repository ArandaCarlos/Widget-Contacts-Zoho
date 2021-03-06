/* eslint-disable */
export var ZOHO = function () {
   var b, l = {},
       m = !1,
       g = void 0;
   return {
       embeddedApp: {
           on: function (c, h) {
               l[c] = h;
               b && "function" == typeof h && b.getContext().Event.Listen(c, h)
           },
           init: function () {
               if (!m) {
                   m = !0;
                   b = new ZSDK;
                   var c;
                   g = new Promise(function (b, h) {
                       c = b
                   });
                   b.OnLoad(function () {
                       c()
                   });
                   for (var h in l) b.getContext().Event.Listen(h, l[h])
               }
               return g
           }
       },
       CRM: function () {
           function c(a) {
               a.sdkVersion = "1";
               return b.getContext().Event.Trigger("CRM_EVENT", a, !0)
           }

           function h(a) {
               return new File([a], a.name, {
                   type: a.type
               })
           }

           function g(a, d) {
               var e = {
                   category: "ROLES"
               };
               d && (e.roleId = d);
               return c(e)
           }

           function l(a, d, e, v) {
               if (d.FileData) {
                   var b = h(d.FileData);
                   d.FileData = b
               }
               a = {
                   category: "CREATE",
                   Entity: a,
                   RelatedID: e,
                   APIData: d
               };
               a.type = v || "RECORD";
               return c(a)
           }

           function m(a) {
               a.category = "BLUEPRINT";
               return c(a)
           }

           function t(a) {
               a.category = "APPROVALS";
               return c(a)
           }

           function f(a, d, e) {
               var b;
               if (d.FILE) {
                   b = h(d.FILE.file);
                   d.FILE.file = b
               }
               b = void 0;
               if (e) b = d;
               else {
                       b = d.url,
                       g = d.params,
                       f = d.headers,
                       l = d.body,
                       n = d.PARTS,
                       x = d.PART_BOUNDARY,
                       A = d.CONTENT_TYPE,
                       D = d.RESPONSE_TYPE;
                   d = d.FILE;
                   if (!b) throw {
                       Message: "Url missing"
                   };
                   if (g) {
                       var k, m = [];
                       for (k in g) m.push(encodeURIComponent(k) + "\x3d" + encodeURIComponent(g[k]));
                       k = m.join("\x26");
                       b += (-1 < b.indexOf("?") ? "\x26" : "?") + k
                   }
                   b = {
                       url: b,
                       Header: f,
                       Body: l,
                       CONTENT_TYPE: A,
                       RESPONSE_TYPE: D,
                       PARTS: n,
                       PARTS_BOUNDARY: x,
                       FILE: d
                   }
               }
               return c({
                   category: "CONNECTOR",
                   nameSpace: a,
                   data: b,
                   type: e
               })
           }

           function k(a) {
               $.extend(a, {
                   category: "UI"
               });
               return c(a)
           }

           function u(a, d, e) {
               return c({
                   category: "CONFIG",
                   type: a,
                   nameSpace: d,
                   APIData: e
               })
           }

           function p(a) {
               var d = {
                   category: "USER"
               };
               a.ID ? d.ID = a.ID : a.Type && (d.Type = a.Type, a.page &&
                   (d.page = a.page), a.per_page && (d.per_page = a.per_page));
               return c(d)
           }

           function q(a) {
               return c({
                   category: "META",
                   type: a.type,
                   subType: a.subType,
                   Entity: a.Entity,
                   Id: a.Id
               })
           }
           return {
               ACTION: {
                   setConfig: function (a) {
                       return c({
                           category: "ACTION",
                           type: "CUSTOM_ACTION_SAVE_CONFIG",
                           object: a
                       })
                   },
                   enableAccountAccess: function (a) {
                       return c({
                           category: "ACTION",
                           type: "ENABLE_ACCOUNT_ACCESS",
                           object: a
                       })
                   }
               },
               FUNCTIONS: {
                   execute: function (a, d) {
                       var e = {};
                       d.auth_type = "oauth";
                       e.data = d;
                       return c({
                           category: "FUNCTIONS_EXECUTE",
                           customFunctionName: a,
                           data: e
                       })
                   }
               },
               CONFIG: {
                   getOrgInfo: function (a) {
                       return u("ORG")
                   },
                   getCurrentUser: function () {
                       return u("CURRENT_USER")
                   },
                   GetCurrentEnvironment: function () {
                       return u("ORG_LEVEL_INFO")
                   }
               },
               META: {
                   getFields: function (a) {
                       a.type = "FIELD_LIST";
                       return q(a)
                   },
                   getModules: function () {
                       return q({
                           type: "MODULE_LIST"
                       })
                   },
                   getAssignmentRules: function (a) {
                       a.type = "ASSIGNMENT_RULES";
                       return q(a)
                   },
                   getLayouts: function (a) {
                       a.Id = a.Id ? a.Id : a.LayoutId;
                       a.type = a.Id ? "LAYOUT" : "LAYOUTS";
                       return q(a)
                   },
                   getRelatedList: function (a) {
                       a.type = "RELATED_LIST";
                       return q(a)
                   },
                   getCustomViews: function (a) {
                       a.type = a.Id ? "CUSTOM_VIEW" : "CUSTOM_VIEWS";
                       return q(a)
                   },
                   EMAIL: {
                       getAvailableFromAliases: function () {
                           return q({
                               type: "EMAIL",
                               subType: "GET_ALIAS"
                           })
                       }
                   }
               },
               API: {
                   addNotes: function (a) {
                       return l(a.Entity, {
                           data: [{
                               Note_Title: a.Title,
                               Note_Content: a.Content
                           }]
                       }, a.RecordID, "NOTES")
                   },
                   addNotesAttachment: function (a) {
                       return c({
                           category: "UPDATE",
                           type: "NOTES",
                           Entity: a.Entity,
                           RecordID: a.RecordID,
                           RelatedRecordID: a.RelatedRecordID,
                           APIData: {
                               Files: {
                                   FileName: File.Name,
                                   FileData: File.Content
                               }
                           }
                       })
                   },
                   coql: function (a) {
                       return c({
                           category: "QUERY",
                           APIData: a
                       })
                   },
                   getAllRoles: function () {
                       return g("ROLES")
                   },
                   getRoleById: function (a) {
                       return g("ROLE", a.id)
                   },
                   insertRecord: function (a) {
                       var d = a.Entity,
                           e = a.APIData;
                       e.trigger = a.Trigger;
                       return l(d, e)
                   },
                   upsertRecord: function (a) {
                       var d = a.Entity,
                           e = a.APIData;
                       e.trigger = a.Trigger;
                       e.action = "UPSERT";
                       a.duplicate_check_fields && a.duplicate_check_fields instanceof Array && (e.duplicate_check_fields = a.duplicate_check_fields.join(","));
                       return l(d, e)
                   },
                   getRecord: function (a) {
                       return c({
                           category: "READ",
                           APIData: {
                               Entity: a.Entity,
                               RecordID: a.RecordID,
                               RelatedList: void 0
                           }
                       })
                   },
                   getBluePrint: function (a) {
                       return m({
                           Entity: a.Entity,
                           RecordID: a.RecordID,
                           action: "GET_BLUEPRINT_STATUS"
                       })
                   },
                   updateBluePrint: function (a) {
                       return m({
                           Entity: a.Entity,
                           RecordID: a.RecordID,
                           BlueprintData: a.BlueprintData,
                           action: "UPDATE_BLUEPRINT_STATUS"
                       })
                   },
                   uploadFile: function (a) {
                       a instanceof File ? (a = {
                           FileData: h(a),
                           category: "FILES",
                           type: "UPLOAD_FILE"
                       }, a = c(a)) : a = Promise.reject("Input is not of type File");
                       return a
                   },
                   getFile: function (a) {
                       a.category = "FILES";
                       a.type = "DOWNLOAD_FILE";
                       return c(a)
                   },
                   getAllRecords: function (a) {
                       return c({
                           category: "READ",
                           APIData: a
                       })
                   },
                   updateRecord: function (a) {
                       var d = a.Entity,
                           e = a.APIData;
                       e.trigger = a.Trigger;
                       return c({
                           category: "UPDATE",
                           type: "RECORD",
                           Entity: d,
                           APIData: e
                       })
                   },
                   updateVoiceURL: function (a) {
                       return c({
                           category: "UPDATE",
                           type: "VOICE_URL",
                           APIData: a
                       })
                   },
                   deleteRecord: function (a) {
                       return c({
                           category: "DELETE",
                           type: "RECORD",
                           Entity: a.Entity,
                           RecordID: a.RecordID
                       })
                   },
                   searchRecord: function (a) {
                       a = {
                           category: "SEARCH",
                           APIData: a
                       };
                       return c(a)
                   },
                   getAllActions: function (a) {
                       a.action = "GET_ALL_ACTIONS";
                       return t(a)
                   },
                   getApprovalRecords: function (a) {
                       var d = {};
                       a ? a.action = "GET_APPROVAL_RECORDS" : (d.action = "GET_APPROVAL_RECORDS", a = d);
                       return t(a)
                   },
                   getApprovalById: function (a) {
                       a.action = "GET_APPROVALBYID";
                       return t(a)
                   },
                   getApprovalsHistory: function () {
                       return t({
                           action: "GET_APPROVALS_HISTORY"
                       })
                   },
                   approveRecord: function (a) {
                       a.action = "UPDATE_APPROVAL";
                       return t(a)
                   },
                   getAllUsers: function (a) {
                       return p({
                           Type: a.Type,
                           page: a.page,
                           per_page: a.per_page
                       })
                   },
                   getUser: function (a) {
                       return p({
                           ID: a.ID
                       })
                   },
                   getRelatedRecords: function (a) {
                       return c({
                           category: "READ",
                           APIData: a
                       })
                   },
                   updateRelatedRecords: function (a) {
                       var d = a.Entity,
                           e = a.RecordID,
                           b = a.RelatedList,
                           g = a.RelatedRecordID;
                       a = a.APIData;
                       a instanceof File && (a = h(a));
                       return c({
                           category: "UPDATE",
                           type: "RELATED_RECORD",
                           Entity: d,
                           RecordID: e,
                           RelatedList: b,
                           RelatedRecordID: g,
                           APIData: a
                       })
                   },
                   delinkRelatedRecord: function (a) {
                       return c({
                           category: "DELETE",
                           type: "RELATED_RECORD",
                           Entity: a.Entity,
                           RecordID: a.RecordID,
                           RelatedList: a.RelatedList,
                           RelatedRecordID: a.RelatedRecordID
                       })
                   },
                   attachFile: function (a) {
                       var d = a.Entity,
                           e = a.RecordID;
                       a = a.File;
                       a = {
                           FileName: a.Name,
                           FileData: a.Content
                       };
                       return l(d, a, e, "ATTACHMENT")
                   },
                   getAllProfiles: function (a) {
                       return c({
                           category: "PROFILES",
                           type: "GET_ALL_PROFILES"
                       })
                   },
                   getProfile: function (a) {
                       return c({
                           category: "PROFILES",
                           type: "GET_PROFILE",
                           ID: a.ID
                       })
                   },
                   updateProfile: function (a) {
                       return c({
                           category: "UPDATE",
                           type: "PROFILE",
                           ID: a.ID,
                           APIData: a.APIData
                       })
                   },
                   getOrgVariable: function (a) {
                       return u("VARIABLE", a)
                   },
                   sendMail: function (a) {
                       a = {
                           category: "MAIL",
                           APIData: a
                       };
                       return c(a)
                   }
               },
               UI: {
                   Resize: function (a) {
                       a = {
                           action: "RESIZE",
                           data: {
                               width: a.width,
                               height: a.height
                           }
                       };
                       return k(a)
                   },
                   Setting: {
                       open: function (a) {
                           a = {
                               action: {
                                   setting: "OPEN"
                               },
                               data: a
                           };
                           return k(a)
                       }
                   },
                   Dialer: {
                       maximize: function () {
                           return k({
                               action: {
                                   telephony: "MAXIMIZE"
                               }
                           })
                       },
                       minimize: function () {
                           return k({
                               action: {
                                   telephony: "MINIMIZE"
                               }
                           })
                       },
                       notify: function () {
                           return k({
                               action: {
                                   telephony: "NOTIFY"
                               }
                           })
                       }
                   },
                   Record: {
                       open: function (a) {
                           a = {
                               action: {
                                   record: "OPEN"
                               },
                               data: {
                                   Entity: a.Entity,
                                   RecordID: a.RecordID,
                                   target: a.Target
                               }
                           };
                           return k(a)
                       },
                       edit: function (a) {
                           a = {
                               action: {
                                   record: "EDIT"
                               },
                               data: {
                                   Entity: a.Entity,
                                   RecordID: a.RecordID,
                                   target: a.Target
                               }
                           };
                           return k(a)
                       },
                       create: function (a) {
                           a = {
                               action: {
                                   record: "CREATE"
                               },
                               data: {
                                   Entity: a.Entity,
                                   RecordID: a.RecordID,
                                   target: a.Target
                               }
                           };
                           return k(a)
                       },
                       populate: function (a) {
                           return k({
                               action: {
                                   record: "POPULATE"
                               },
                               data: a
                           })
                       }
                   },
                   Popup: {
                       close: function () {
                           return k({
                               action: {
                                   popup: "CLOSE"
                               }
                           })
                       },
                       closeReload: function () {
                           return k({
                               action: {
                                   popup: "CLOSE_RELOAD"
                               }
                           })
                       }
                   },
                   Widget: {
                    open: function (a) {
                      a = { action: { webTab: "OPEN" }, data: a };
                      return k(a);
                    },
                    },
                   WebTab: {
                       open: function (a) {
                           a = {
                               action: {
                                   webTab: "OPEN"
                               },
                               data: a
                           };
                           return k(a)
                       },
                       history: {
                           pushState: function (a) {
                               a = {
                                   action: {
                                       webTab: "HISTORY"
                                   },
                                   data: a
                               };
                               return k(a)
                           }
                       }
                   }
               },
               HTTP: {
                   get: function (a) {
                       return f("wget.get", a)
                   },
                   post: function (a) {
                       return f("wget.post", a)
                   },
                   put: function (a) {
                       return f("wget.put", a)
                   },
                   patch: function (a) {
                       return f("wget.patch", a)
                   },
                   delete: function (a) {
                       return f("wget.delete", a)
                   }
               },
               CONNECTOR: {
                   invokeAPI: function (a, d) {
                       return f(a, d, "CONNECTOR_API")
                   },
                   authorize: function (a) {
                       return f(a, {}, "CONNECTOR_AUTHORIZE")
                   },
                   isConnectorAuthorized: function (a) {
                       return f(a, {
                           invokeType: "ISAUTHORIZE"
                       }, "CONNECTOR_API")
                   },
                   revokeConnector: function (a) {
                       return f(a, {}, "CONNECTOR_REVOKE")
                   }
               },
               CONNECTION: {
                   invoke: function (a,
                       d) {
                       var e = {},
                           b = {};
                       b.url = d.url;
                       b.method = d.method;
                       b.param_type = d.param_type;
                       b.parameters = JSON.stringify(d.parameters);
                       b.headers = JSON.stringify(d.headers);
                       e.data = b;
                       return c({
                           category: "CRM_CONNECTION",
                           connectionName: a,
                           data: e
                       })
                   }
               },
               BLUEPRINT: {
                proceed: function () {
                  return c({ category: "CRM_BLUEPRINT" });
                },
              },
           }
       }()
   }
}();
var ZSDKUtil = function (b) {
       function l(c) {}

       function m(c) {
           var b = {};
           c = c || window.location.href;
           c.substr(c.indexOf("?") + 1).split("\x26").forEach(function (c, g) {
               var h = c.split("\x3d");
               b[h[0]] = h[1]
           });
           b.hasOwnProperty("serviceOrigin") && (b.serviceOrigin = decodeURIComponent(b.serviceOrigin));
           return b
       }
       var g = m(),
           c;
       l.prototype.Info = function () {
           (b.isDevMode() || b.isLogEnabled()) && window.console.info.apply(null, arguments)
       };
       l.prototype.Error = function () {
           (b.isDevMode() || b.isLogEnabled()) && window.console.error.apply(null,
               arguments)
       };
       b.GetQueryParams = m;
       b.isDevMode = function () {
           return g && g.isDevMode
       };
       b.isLogEnabled = function () {
           return g && g.isLogEnabled
       };
       b.getLogger = function () {
           c && c instanceof l || (c = new l);
           return c
       };
       b.Sleep = function (c) {
           for (var b = (new Date).getTime(); b + c > (new Date).getTime(););
       };
       return b
   }(window.ZSDKUtil || {}),
   ZSDKMessageManager = function (b) {
       function l(d) {
           try {
               var b = "string" === typeof d.data ? JSON.parse(d.data) : d.data
           } catch (A) {
               b = d.data
           }
           var l = b.type,
               p = b.eventName;
           try {
               var n;
               if (!(n = "SET_CONTEXT" === p)) {
                   var t = d.source,
                       r = d.origin;
                   n = f.isAppRegistered() && q === t && a === r ? !0 : Error("Un-Authorized Message.")
               }
               if (n) switch (l) {
                   case "FRAMEWORK.EVENT":
                       var x = {
                           SET_CONTEXT: m,
                           UPDATE_CONTEXT: g,
                           EVENT_RESPONSE: c,
                           EVENT_RESPONSE_FAILURE: h
                       } [b.eventName];
                       x && "function" === typeof x ? x(d, b) : ZSDKEventManager.NotifyEventListeners(f.AppContext, b.eventName, b.data);
                       break;
                   default:
                       f.MessageInterceptor(d, b)
               }
           } catch (A) {
               k.Error("[SDK.MessageHandler] \x3d\x3e ", A.stack)
           }
       }

       function m(d, b) {
           q = window.parent;
           a = f.QueryParams.serviceOrigin;
           f.SetContext(b.data);
           f.ExecuteLoadHandler()
       }

       function g(a, b) {}

       function c(a, b) {
           n(b.promiseid, !0, b.data)
       }

       function h(a, b) {
           n(b.promiseid, !1, b.data)
       }

       function n(a, b, c) {
           p.hasOwnProperty(a) && (b ? p[a].resolve(c) : p[a].reject(c), p[a] = void 0, delete p[a])
       }

       function y(a) {
           return new Promise(function (b, c) {
               p[a] = {
                   resolve: b,
                   reject: c,
                   time: (new Date).getTime()
               }
           })
       }

       function w(a) {
           "object" === typeof a && (a.appOrigin = encodeURIComponent(t()));
           if (!q) throw Error("Parentwindow reference not found.");
           q.postMessage(a, f.QueryParams.serviceOrigin)
       }

       function t() {
           return window.location.protocol +
               "//" + window.location.host + window.location.pathname
       }
       var f, k = ZSDKUtil.getLogger(),
           u = 100,
           p = {},
           q, a;
       b.Init = function (a, c) {
           if (!a || "object" !== typeof a) throw Error("Invalid Context object passed");
           if (c && "object" !== typeof c) throw Error("Invalid Configuration Passed to MessageManager");
           f = a;
           return l.bind(b)
       };
       b.RegisterApp = function () {
           var a = {
               type: "SDK.EVENT",
               eventName: "REGISTER",
               appOrigin: encodeURIComponent(t())
           };
           window.parent.postMessage(a, f.QueryParams.serviceOrigin)
       };
       b.DERegisterApp = function () {
           var a = {
               type: "SDK.EVENT",
               eventName: "DEREGISTER",
               uniqueID: f.getUniqueID()
           };
           w(a)
       };
       b.SendRequest = function (a) {
           if (!a || "object" !== typeof a) throw Error("Invalid Options passed");
           var b;
           b = "Promise" + u++;
           a = {
               type: "SDK.EVENT",
               eventName: "HTTP_REQUEST",
               uniqueID: f.getUniqueID(),
               time: (new Date).getTime(),
               promiseid: b,
               data: a
           };
           w(a);
           b = y(b);
           return b
       };
       b.TriggerEvent = function (a, b, c) {
           if (!a) throw Error("Invalid Eventname : ", a);
           var g = c ? "Promise" + u++ : void 0;
           a = {
               type: "SDK.EVENT",
               eventName: a,
               uniqueID: f.getUniqueID(),
               time: (new Date).getTime(),
               promiseid: g,
               data: b
           };
           w(a);
           if (c) return y(g)
       };
       return b
   }(window.ZSDKMessageManager || {}),
   ZSDKEventManager = function (b) {
       var l = ZSDKUtil.getLogger(),
           m = {};
       b.AttachEventListener = function (b, c) {
           "function" === typeof c && (Array.isArray(m[b]) || (m[b] = []), m[b].push(c))
       };
       b.NotifyEventListeners = function (b, c, h) {
           var n = c.match(/^__[A-Za-z_]+__$/gi);
           Array.isArray(n);
           if ((n = m[c]) && Array.isArray(n))
               for (c = 0; c < n.length; c++) n[c].call(b, h);
           else l.Info("Cannot find EventListeners for Event : ", c)
       };
       b.NotifyInternalEventHandler = function (b, c) {
           var h =
               c.eventName;
           "__APP_INIT__" === h ? (b.SetContext(c.data), b.ExecuteLoadHandler()) : "__APP_CONTEXT_UPDATE__" === h && (b.UpdateContext(c.data), b.ExecuteContextUpdateHandler())
       };
       return b
   }(window.ZSDKEventManager || {});

function ZSDK() {
   function b() {
       "function" !== typeof p ? z.Error("No OnLoad Handler provided to execute.") : C ? z.Error("OnLoad event already triggered.") : (p.call(r, r), C = !0)
   }

   function l() {
       q.call(r, r)
   }

   function m() {
       return B
   }

   function g(a, b, c) {
       return ZSDKMessageManager.TriggerEvent(a, b, c)
   }

   function c(b) {
       z.Info("Setting AppContext data");
       var c = b && b.model || {}, isDevMode;
       isDevMode && b.locale && b.localeResource && 0 === Object.keys(b.localeResource).length && b.localeResource.constructor === Object && b.locale && w(b.locale);
       if ("undefined" !==
           typeof ZSDKModelManager) {
           for (var d in c) ZSDKModelManager.AddModel(d, c[d]);
           r.Model = ZSDKModelManager.GetModelStore()
       }
       e = b.uniqueID;
       a = b.connectors;
       z.Info("App Connectors ", a);
       B = !0
   }

   function h() {
       return e
   }

   function n(a) {}

   function y() {
       return a
   }

   function w(a) {
       t("/app-translations/" + a + ".json", function (a) {
           v = JSON.parse(a);
           u()
       })
   }

   function t(a, b) {
       var c = new XMLHttpRequest;
       c.open("GET", a, !1);
       c.onreadystatechange = function () {
           4 == c.readyState && "200" == c.status && b(c.responseText)
       };
       c.send(null)
   }

   function f(a, b, c) {
       for (var d =
               ""; d != a;) d = a, a = a.replace(b, c);
       return a
   }

   function k(a, b) {
       b = b.replace(/\[(\w+)\]/g, ".$1");
       b = b.replace(/^\./, "");
       for (var c = b.split("."), d = 0, e = c.length; d < e; ++d) {
           var f = c[d];
           if (f in a) a = a[f];
           else return
       }
       return a
   }

   function u() {
       var a = document.querySelectorAll("[data-i18n]"),
           b;
       for (b in a)
           if (a.hasOwnProperty(b)) {
               var c = k(v, a[b].getAttribute("data-i18n"));
               if (!c) return !1;
               if (a[b].hasAttribute("data-options")) {
                   var d = JSON.parse(JSON.stringify(eval("(" + a[b].getAttribute("data-options") + ")"))),
                       e = Object.keys(d),
                       g;
                   for (g in e) c =
                       f(c, "${" + e[g] + "}", d[e[g]])
               }
               a[b].innerHTML = c
           }
   }
   var p, q, a, d, e, v = {},
       z = ZSDKUtil.getLogger(),
       B = !1,
       C = !1;
   this.isContextReady = !1;
   this.HelperContext = {};
   this.isDevMode = !1;
   this.getContext = function () {
       return r
   };
   var r = {
       Model: {},
       Event: {}
   };
   r.Event.Listen = function (a, b) {
       ZSDKEventManager.AttachEventListener(a, b)
   };
   r.Event.Trigger = g;
   r.GetRequest = function (a) {
       return ZSDKMessageManager.SendRequest(a)
   };
   r.QueryParams = d;
   r.Translate = function (a, b) {
       var c = "";
       a && (c = k(v, a));
       if (!c) return !1;
       if (b) {
           var d = JSON.parse(JSON.stringify(eval(b))),
               e = Object.keys(d);
           for (a in e) c = f(c, "${" + e[a] + "}", d[e[a]])
       }
       return c
   };
   this.OnLoad = function (a) {
       if ("function" !== typeof a) throw Error("Invalid Function value is passed");
       p = a;
       B && b()
   };
   this.OnUnLoad = function (a) {};
   this.OnContextUpdate = function (a) {
       q = a
   };
   (function () {
       d = ZSDKUtil.GetQueryParams();
       //var isDevMode = !!d.isDevMode;
       var a = {};
       a.isDevMode = !!d.isDevMode;
       a.ExecuteLoadHandler = b;
       a.SetContext = c;
       a.UpdateContext = n;
       a.QueryParams = d;
       a.GetConnectors = y;
       a.TriggerEvent = g;
       a.ExecuteContextUpdateHandler = l;
       a.getUniqueID = h;
       a.isAppRegistered =
           m;
       var e = ZSDKMessageManager.Init(a);
       window.addEventListener("message", e);
       window.addEventListener("unload", function () {
           ZSDKMessageManager.DERegisterApp()
       });
       "undefined" !== typeof ZSDKModelManager && ZSDKModelManager.Init(a);
       ZSDKMessageManager.RegisterApp()
   })()
};