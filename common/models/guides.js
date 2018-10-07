'use strict';

module.exports = (guides) => {
    guides.state = (msg, cb) => {
        cb(null,'Вызвал ' + msg);
    }

    guides.remoteMethod(
        'state', {
            accepts: {arg: 'msg', type: 'number'},
            returns: {arg: 'state', type: 'string'}
        }
    );
};
