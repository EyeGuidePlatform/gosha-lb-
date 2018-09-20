'use strict';

module.exports = (Guide) => {
    Guide.state = (msg, cb) => {
        cb(null,'Вызвал ' + msg);
    }

    Guide.remoteMethod(
        'state', {
            accepts: {arg: 'msg', type: 'number'},
            returns: {arg: 'state', type: 'string'}
        }
    );
};
