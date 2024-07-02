export var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["verbose"] = 0] = "verbose";
    LogLevel[LogLevel["debug"] = 1] = "debug";
    LogLevel[LogLevel["info"] = 2] = "info";
    LogLevel[LogLevel["warning"] = 3] = "warning";
    LogLevel[LogLevel["error"] = 4] = "error";
    LogLevel[LogLevel["critical"] = 5] = "critical";
})(LogLevel || (LogLevel = {}));
