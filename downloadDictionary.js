let dictionary = null;
const downloadDictionary = (url, file, callback) => {
  let stream = fs.createWriteStream(file);
  let req = https.get(url, function (res) {
    res.pipe(stream);
    stream.on('finish', function () {
      stream.close(callback);
      console.log('dictionary downloaded');
    });
  }).on('error', function (err) {
    fs.unlink(file);
      if (callback) cb(err.message);
  });
};

let loadDictionary = (file, callback) => {
  fs.readFile(file, (err, data) => {
    if (err) {
      console.log(err);
      callback(err);
        return;
      }
      dictionary = JSON.parse(data);
      console.log('dictionary loaded.');
      callback();
  });
};

downloadDictionary('https://raw.githubusercontent.com/kkkrv/dictionary/main/dictionary.json', 'dictionary.json', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  loadDictionary('dictionary.json', (err) => {
    if (err) {
      console.log(err);
      return;
    };
    console.log('ready to serve');
  });
});

module.exports = dictionary;
