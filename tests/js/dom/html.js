module.exports = function(body) {
    body = body || '';
    var html = '<!DOCTYPE html><html><head><title></title></head><body><div>{{body}}</div></body></html>';

    return html.replace('{{body}}', body);
}
