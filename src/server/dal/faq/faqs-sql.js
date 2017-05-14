"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var _ = require("lodash");
var sql = require("mssql");
var FaqsSql = (function () {
    function FaqsSql() {
    }
    FaqsSql.prototype.AddItem = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.AddFaq(req).then(function (res) {
                    var newID = res.output.newID;
                    console.log(newID);
                    var newFaq = { id: newID, prb: req.body.prb, sln: req.body.sln, ts: new Date().getDate(), lnks: req.body.lnks };
                    exports.SupportIssues.push(newFaq);
                    newFaq.lnks.forEach(function (i) {
                        _this.AddLnks(i, newFaq.id);
                    });
                });
                return [2 /*return*/, null];
            });
        });
    };
    FaqsSql.prototype.AddLnks = function (supportIssueLink, sID) {
        return __awaiter(this, void 0, void 0, function () {
            var pool1, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        pool1 = new sql.ConnectionPool({
                            user: 'lior',
                            password: '1234',
                            server: '127.0.0.1',
                            database: 'info'
                        });
                        return [4 /*yield*/, pool1.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, pool1.request() // or: new sql.Request(pool1) 
                                .input('@SupportIssueID', sql.NVarChar, sID)
                                .input('Path', sql.NVarChar, supportIssueLink.pth)
                                .execute('SupportIssueLinksUpdate').then(function (res) {
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [2 /*return*/, Promise.resolve(null)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FaqsSql.prototype.AddFaq = function (req) {
        var pool1 = new sql.ConnectionPool({
            user: 'lior',
            password: '1234',
            server: '127.0.0.1',
            database: 'info'
        });
        return pool1.connect().then(function () {
            return pool1.request() // or: new sql.Request(pool1) 
                .output('newID', sql.Int)
                .input('ID', null)
                .input('Problem', sql.NVarChar, req.body.prb)
                .input('Solution', sql.NVarChar, req.body.sln)
                .input('ModuleID', sql.Int, -1)
                .execute('SupportIssuesUpdate');
            // .then((res) => {
            //     let newID = res.output.newID;
            //     console.log(newID);
            //     let newFaq = { id: newID, prb: req.body.prb, sln: req.body.sln, ts: new Date().getDate(), lnks: req.body.lnks };
            //     SupportIssues.push(newFaq);
            //     console.log(newFaq);
            //     return newFaq;
            // });
        });
    };
    FaqsSql.prototype.UpdateItem = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var pool1, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        pool1 = new sql.ConnectionPool({
                            user: 'lior',
                            password: '1234',
                            server: '127.0.0.1',
                            database: 'info'
                        });
                        return [4 /*yield*/, pool1.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, pool1.request() // or: new sql.Request(pool1) 
                                .input('ID', sql.Int, req.body.id)
                                .input('Problem', sql.NVarChar, req.body.prb)
                                .input('Solution', sql.NVarChar, req.body.sln)
                                .input('ModuleID', sql.NVarChar, req.body.mID)
                                .execute('[SupportIssuesUpdate]').then(function () {
                                var item = exports.SupportIssues.find(function (i) { return i.id == req.body.id; });
                                if (item != null) {
                                    item.sln = req.body.sln;
                                    item.prb = req.body.prb;
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        console.log(err_2);
                        return [2 /*return*/, Promise.resolve(null)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FaqsSql.prototype.deleteItem = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var pool1, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        pool1 = new sql.ConnectionPool({
                            user: 'lior',
                            password: '1234',
                            server: '127.0.0.1',
                            database: 'info'
                        });
                        return [4 /*yield*/, pool1.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, pool1.request() // or: new sql.Request(pool1) 
                                .input('ID', sql.Int, req.params.faqID)
                                .execute('[SupportIssuesDelete]').then(function () {
                                var index = exports.SupportIssues.indexOf(req['faq'], 0);
                                if (index > -1) {
                                    exports.SupportIssues.splice(index, 1);
                                }
                                exports.SupportIssues.slice();
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        console.log(err_3);
                        return [2 /*return*/, Promise.resolve(null)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FaqsSql.prototype.loadFaqS = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pool1, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        pool1 = new sql.ConnectionPool({
                            user: 'lior',
                            password: '1234',
                            server: '127.0.0.1',
                            database: 'info'
                        });
                        return [4 /*yield*/, pool1.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, pool1.request() // or: new sql.Request(pool1) 
                                .execute('SupportIssuesSelect').then(this.extractData)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_4 = _a.sent();
                        console.log(err_4);
                        return [2 /*return*/, Promise.resolve(null)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FaqsSql.prototype.extractData = function (res) {
        var sis = [];
        res.recordsets[0].forEach(function (i) {
            sis.push({ id: i.ID, prb: i.Problem, sln: i.Solution, mID: i.ModuleID, ts: i.TimeStamp });
        });
        var sisLnk = [];
        res.recordsets[1].forEach(function (i) {
            sisLnk.push({ id: i.ID, sIid: i.SupportIssueID, pth: i.Path, nm: '' });
        });
        var grpd = _.groupBy(sisLnk, 'sIid');
        _.each(grpd, function (lnk) {
            var si = sis.find(function (item) { return item.id == lnk[0].sIid; });
            if (si != null) {
                si.lnks = [];
                // console.log(si);
                _.each(lnk, function (i) {
                    // console.log(i);
                    si.lnks.push({ id: i.id, sIid: +i.sIid, pth: i.pth, nm: i.nm });
                    // console.log(si);
                });
            }
            // console.log(sis);
            exports.SupportIssues = sis;
            return sis;
        });
    };
    return FaqsSql;
}());
exports.FaqsSql = FaqsSql;
