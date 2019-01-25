'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.__RewireAPI__ = exports.__ResetDependency__ = exports.__set__ = exports.__Rewire__ = exports.__GetDependency__ = exports.__get__ = exports.adapterFactory = exports.CucumberAdapter = undefined;

var _isExtensible = require('babel-runtime/core-js/object/is-extensible');

var _isExtensible2 = _interopRequireDefault(_isExtensible);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _cucumber = require('cucumber');

var Cucumber = _interopRequireWildcard(_cucumber);

var _mockery = require('mockery');

var _mockery2 = _interopRequireDefault(_mockery);

var _isGlob = require('is-glob');

var _isGlob2 = _interopRequireDefault(_isGlob);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _wdioSync = require('wdio-sync');

var _reporter = require('./reporter');

var _reporter2 = _interopRequireDefault(_reporter);

var _hookRunner = require('./hookRunner');

var _hookRunner2 = _interopRequireDefault(_hookRunner);

var _events = require('events');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_TIMEOUT = 30000;
var DEFAULT_OPTS = {
    backtrace: false, // <boolean> show full backtrace for errors
    compiler: [], // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
    failAmbiguousDefinitions: false, // <boolean> treat ambiguous definitions as errors
    failFast: false, // <boolean> abort the run on first failure
    ignoreUndefinedDefinitions: false, // <boolean> treat undefined definitions as warnings
    name: [], // <REGEXP[]> only execute the scenarios with name matching the expression (repeatable)
    profile: [], // <string> (name) specify the profile to use
    require: [], // <string> (file/dir/glob) require files before executing features
    order: 'defined', // <string> switch between deterministic  and random feature execution. Either "defined", "random" or "random:42" whereas 42 is the seed for randomization
    snippetSyntax: undefined, // <string> specify a custom snippet syntax
    snippets: true, // <boolean> hide step definition snippets for pending steps
    source: true, // <boolean> hide source uris
    strict: false, // <boolean> fail if there are any undefined or pending steps
    tagExpression: '', // <string> (expression) only execute the features or scenarios with tags matching the expression
    tagsInTitle: false, // <boolean> add cucumber tags to feature or scenario name
    timeout: _get__('DEFAULT_TIMEOUT') // <number> timeout for step definitions in milliseconds
};

var CucumberAdapter = function () {
    function CucumberAdapter(cid, config, specs, capabilities) {
        (0, _classCallCheck3.default)(this, CucumberAdapter);

        this.cwd = process.cwd();
        this.cid = cid;
        this.config = config;
        this.specs = specs;
        this.capabilities = capabilities;

        this.cucumberOpts = (0, _assign2.default)(_get__('DEFAULT_OPTS'), config.cucumberOpts);
    }

    (0, _createClass3.default)(CucumberAdapter, [{
        key: 'run',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var supportCodeLibrary, eventBroadcaster, reporterOptions, reporter, pickleFilter, testCases, runtime, result;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _get__('Cucumber').supportCodeLibraryBuilder.reset(this.cwd);

                                _get__('wrapCommands')(global.browser, this.config.beforeCommand, this.config.afterCommand);

                                this.registerCompilers();
                                this.loadSpecFiles();
                                this.wrapSteps();
                                _get__('Cucumber').setDefaultTimeout(this.cucumberOpts.timeout);
                                supportCodeLibrary = _get__('Cucumber').supportCodeLibraryBuilder.finalize();
                                eventBroadcaster = new (_get__('EventEmitter'))();
                                // eslint-disable-next-line no-new

                                new (_get__('HookRunner'))(eventBroadcaster, this.config);

                                reporterOptions = {
                                    capabilities: this.capabilities,
                                    ignoreUndefinedDefinitions: Boolean(this.cucumberOpts.ignoreUndefinedDefinitions),
                                    failAmbiguousDefinitions: Boolean(this.cucumberOpts.failAmbiguousDefinitions),
                                    tagsInTitle: Boolean(this.cucumberOpts.tagsInTitle)
                                };
                                reporter = new (_get__('CucumberReporter'))(eventBroadcaster, reporterOptions, this.cid, this.specs);
                                pickleFilter = new (_get__('Cucumber').PickleFilter)({
                                    featurePaths: this.spec,
                                    names: this.cucumberOpts.name,
                                    tagExpression: this.cucumberOpts.tagExpression
                                });
                                _context.next = 14;
                                return _get__('Cucumber').getTestCasesFromFilesystem({
                                    cwd: this.cwd,
                                    eventBroadcaster: eventBroadcaster,
                                    featurePaths: this.specs,
                                    order: this.cucumberOpts.order,
                                    pickleFilter: pickleFilter
                                });

                            case 14:
                                testCases = _context.sent;
                                runtime = new (_get__('Cucumber').Runtime)({
                                    eventBroadcaster: eventBroadcaster,
                                    options: this.cucumberOpts,
                                    supportCodeLibrary: supportCodeLibrary,
                                    testCases: testCases
                                });
                                _context.next = 18;
                                return _get__('executeHooksWithArgs')(this.config.before, [this.capabilities, this.specs]);

                            case 18:
                                _context.next = 20;
                                return runtime.start();

                            case 20:
                                if (!_context.sent) {
                                    _context.next = 24;
                                    break;
                                }

                                _context.t0 = 0;
                                _context.next = 25;
                                break;

                            case 24:
                                _context.t0 = 1;

                            case 25:
                                result = _context.t0;
                                _context.next = 28;
                                return _get__('executeHooksWithArgs')(this.config.after, [result, this.capabilities, this.specs]);

                            case 28:
                                _context.next = 30;
                                return reporter.waitUntilSettled();

                            case 30:
                                return _context.abrupt('return', result);

                            case 31:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function run() {
                return _ref.apply(this, arguments);
            }

            return run;
        }()
    }, {
        key: 'registerCompilers',
        value: function registerCompilers() {
            this.cucumberOpts.compiler.forEach(function (compiler) {
                if (compiler instanceof Array) {
                    var parts = compiler[0].split(':');
                    require(parts[1])(compiler[1]);
                } else {
                    var _parts = compiler.split(':');
                    require(_parts[1]);
                }
            });
        }
    }, {
        key: 'requiredFiles',
        value: function requiredFiles() {
            return this.cucumberOpts.require.reduce(function (files, requiredFile) {
                if (_get__('isGlob')(requiredFile)) {
                    return files.concat(_get__('glob').sync(requiredFile));
                } else {
                    return files.concat([requiredFile]);
                }
            }, []);
        }
    }, {
        key: 'loadSpecFiles',
        value: function loadSpecFiles() {
            // we use mockery to allow people to import 'our' cucumber even though their spec files are in their folders
            // because of that we don't have to attach anything to the global object, and the current cucumber spec files
            // should just work with no changes with this framework
            _get__('mockery').enable({
                useCleanCache: true,
                warnOnReplace: false,
                warnOnUnregistered: false
            });
            _get__('mockery').registerMock('cucumber', _get__('Cucumber'));
            this.requiredFiles().forEach(function (codePath) {
                var absolutePath = void 0;
                if (_get__('path').isAbsolute(codePath)) {
                    absolutePath = codePath;
                } else {
                    absolutePath = _get__('path').join(process.cwd(), codePath);
                }
                // This allows rerunning a stepDefinitions file
                delete require.cache[require.resolve(absolutePath)];
                require(absolutePath);
            });
            _get__('mockery').disable();
        }

        /**
         * wraps step definition code with sync/async runner with a retry option
         */

    }, {
        key: 'wrapSteps',
        value: function wrapSteps() {
            var sync = this.config.sync;
            var wrapStepSync = this.wrapStepSync;
            var wrapStepAsync = this.wrapStepAsync;

            _get__('Cucumber').setDefinitionFunctionWrapper(function syncAsyncRetryWrapper(fn) {
                var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                var retryTest = isFinite(options.retry) ? parseInt(options.retry, 10) : 0;
                var wrappedFunction = fn.name === 'async' || sync === false ? wrapStepAsync(fn, retryTest) : wrapStepSync(fn, retryTest);
                return wrappedFunction;
            });
        }

        /**
         * wrap step definition to enable retry ability
         * @param  {Function} code       step definitoon
         * @param  {Number}   retryTest  amount of allowed repeats is case of a failure
         * @return {Function}            wrapped step definiton for sync WebdriverIO code
         */

    }, {
        key: 'wrapStepSync',
        value: function wrapStepSync(code) {
            var retryTest = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            return function () {
                var _this = this;

                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                return new _promise2.default(function (resolve, reject) {
                    return global.wdioSync(_get__('executeSync').bind(_this, code, retryTest, args), function (resultPromise) {
                        return resultPromise.then(resolve, reject);
                    }).apply(_this);
                });
            };
        }

        /**
         * wrap step definition to enable retry ability
         * @param  {Function} code       step definitoon
         * @param  {Number}   retryTest  amount of allowed repeats is case of a failure
         * @return {Function}            wrapped step definiton for async WebdriverIO code
         */

    }, {
        key: 'wrapStepAsync',
        value: function wrapStepAsync(code) {
            var retryTest = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            return function () {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }

                return _get__('executeAsync').call(this, code, retryTest, args);
            };
        }
    }]);
    return CucumberAdapter;
}();

var _CucumberAdapter = _get__('CucumberAdapter');
var adapterFactory = {};

_get__('adapterFactory').run = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(cid, config, specs, capabilities) {
        var adapter, result;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        adapter = new (_get__('_CucumberAdapter'))(cid, config, specs, capabilities);
                        _context2.next = 3;
                        return adapter.run();

                    case 3:
                        result = _context2.sent;
                        return _context2.abrupt('return', result);

                    case 5:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function (_x4, _x5, _x6, _x7) {
        return _ref2.apply(this, arguments);
    };
}();

exports.default = _get__('adapterFactory');
exports.CucumberAdapter = CucumberAdapter;
exports.adapterFactory = adapterFactory;

function _getGlobalObject() {
    try {
        if (!!global) {
            return global;
        }
    } catch (e) {
        try {
            if (!!window) {
                return window;
            }
        } catch (e) {
            return this;
        }
    }
}

;
var _RewireModuleId__ = null;

function _getRewireModuleId__() {
    if (_RewireModuleId__ === null) {
        var globalVariable = _getGlobalObject();

        if (!globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__) {
            globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0;
        }

        _RewireModuleId__ = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++;
    }

    return _RewireModuleId__;
}

function _getRewireRegistry__() {
    var theGlobalVariable = _getGlobalObject();

    if (!theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__) {
        theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = (0, _create2.default)(null);
    }

    return __$$GLOBAL_REWIRE_REGISTRY__;
}

function _getRewiredData__() {
    var moduleId = _getRewireModuleId__();

    var registry = _getRewireRegistry__();

    var rewireData = registry[moduleId];

    if (!rewireData) {
        registry[moduleId] = (0, _create2.default)(null);
        rewireData = registry[moduleId];
    }

    return rewireData;
}

(function registerResetAll() {
    var theGlobalVariable = _getGlobalObject();

    if (!theGlobalVariable['__rewire_reset_all__']) {
        theGlobalVariable['__rewire_reset_all__'] = function () {
            theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = (0, _create2.default)(null);
        };
    }
})();

var INTENTIONAL_UNDEFINED = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__ = {};

(function () {
    function addPropertyToAPIObject(name, value) {
        (0, _defineProperty2.default)(_RewireAPI__, name, {
            value: value,
            enumerable: false,
            configurable: true
        });
    }

    addPropertyToAPIObject('__get__', _get__);
    addPropertyToAPIObject('__GetDependency__', _get__);
    addPropertyToAPIObject('__Rewire__', _set__);
    addPropertyToAPIObject('__set__', _set__);
    addPropertyToAPIObject('__reset__', _reset__);
    addPropertyToAPIObject('__ResetDependency__', _reset__);
    addPropertyToAPIObject('__with__', _with__);
})();

function _get__(variableName) {
    var rewireData = _getRewiredData__();

    if (rewireData[variableName] === undefined) {
        return _get_original__(variableName);
    } else {
        var value = rewireData[variableName];

        if (value === INTENTIONAL_UNDEFINED) {
            return undefined;
        } else {
            return value;
        }
    }
}

function _get_original__(variableName) {
    switch (variableName) {
        case 'DEFAULT_TIMEOUT':
            return DEFAULT_TIMEOUT;

        case 'DEFAULT_OPTS':
            return DEFAULT_OPTS;

        case 'Cucumber':
            return _filterWildcardImport__(Cucumber);

        case 'wrapCommands':
            return _wdioSync.wrapCommands;

        case 'EventEmitter':
            return _events.EventEmitter;

        case 'HookRunner':
            return _hookRunner2.default;

        case 'CucumberReporter':
            return _reporter2.default;

        case 'executeHooksWithArgs':
            return _wdioSync.executeHooksWithArgs;

        case 'isGlob':
            return _isGlob2.default;

        case 'glob':
            return _glob2.default;

        case 'mockery':
            return _mockery2.default;

        case 'path':
            return _path2.default;

        case 'executeSync':
            return _wdioSync.executeSync;

        case 'executeAsync':
            return _wdioSync.executeAsync;

        case 'CucumberAdapter':
            return CucumberAdapter;

        case 'adapterFactory':
            return adapterFactory;

        case '_CucumberAdapter':
            return _CucumberAdapter;
    }

    return undefined;
}

function _assign__(variableName, value) {
    var rewireData = _getRewiredData__();

    if (rewireData[variableName] === undefined) {
        return _set_original__(variableName, value);
    } else {
        return rewireData[variableName] = value;
    }
}

function _set_original__(variableName, _value) {
    switch (variableName) {}

    return undefined;
}

function _update_operation__(operation, variableName, prefix) {
    var oldValue = _get__(variableName);

    var newValue = operation === '++' ? oldValue + 1 : oldValue - 1;

    _assign__(variableName, newValue);

    return prefix ? newValue : oldValue;
}

function _set__(variableName, value) {
    var rewireData = _getRewiredData__();

    if ((typeof variableName === 'undefined' ? 'undefined' : (0, _typeof3.default)(variableName)) === 'object') {
        (0, _keys2.default)(variableName).forEach(function (name) {
            rewireData[name] = variableName[name];
        });
    } else {
        if (value === undefined) {
            rewireData[variableName] = INTENTIONAL_UNDEFINED;
        } else {
            rewireData[variableName] = value;
        }

        return function () {
            _reset__(variableName);
        };
    }
}

function _reset__(variableName) {
    var rewireData = _getRewiredData__();

    delete rewireData[variableName];

    if ((0, _keys2.default)(rewireData).length == 0) {
        delete _getRewireRegistry__()[_getRewireModuleId__];
    }

    ;
}

function _with__(object) {
    var rewireData = _getRewiredData__();

    var rewiredVariableNames = (0, _keys2.default)(object);
    var previousValues = {};

    function reset() {
        rewiredVariableNames.forEach(function (variableName) {
            rewireData[variableName] = previousValues[variableName];
        });
    }

    return function (callback) {
        rewiredVariableNames.forEach(function (variableName) {
            previousValues[variableName] = rewireData[variableName];
            rewireData[variableName] = object[variableName];
        });
        var result = callback();

        if (!!result && typeof result.then == 'function') {
            result.then(reset).catch(reset);
        } else {
            reset();
        }

        return result;
    };
}

var _typeOfOriginalExport = typeof adapterFactory === 'undefined' ? 'undefined' : (0, _typeof3.default)(adapterFactory);

function addNonEnumerableProperty(name, value) {
    (0, _defineProperty2.default)(adapterFactory, name, {
        value: value,
        enumerable: false,
        configurable: true
    });
}

if ((_typeOfOriginalExport === 'object' || _typeOfOriginalExport === 'function') && (0, _isExtensible2.default)(adapterFactory)) {
    addNonEnumerableProperty('__get__', _get__);
    addNonEnumerableProperty('__GetDependency__', _get__);
    addNonEnumerableProperty('__Rewire__', _set__);
    addNonEnumerableProperty('__set__', _set__);
    addNonEnumerableProperty('__reset__', _reset__);
    addNonEnumerableProperty('__ResetDependency__', _reset__);
    addNonEnumerableProperty('__with__', _with__);
    addNonEnumerableProperty('__RewireAPI__', _RewireAPI__);
}

function _filterWildcardImport__() {
    var wildcardImport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var validPropertyNames = (0, _keys2.default)(wildcardImport).filter(function (propertyName) {
        return propertyName !== '__get__' && propertyName !== '__set__' && propertyName !== '__reset__' && propertyName !== '__with__' && propertyName !== '__GetDependency__' && propertyName !== '__Rewire__' && propertyName !== '__ResetDependency__' && propertyName !== '__RewireAPI__';
    });
    return validPropertyNames.reduce(function (filteredWildcardImport, propertyName) {
        filteredWildcardImport[propertyName] = wildcardImport[propertyName];
        return filteredWildcardImport;
    }, {});
}

exports.__get__ = _get__;
exports.__GetDependency__ = _get__;
exports.__Rewire__ = _set__;
exports.__set__ = _set__;
exports.__ResetDependency__ = _reset__;
exports.__RewireAPI__ = _RewireAPI__;