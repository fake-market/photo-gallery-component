const { ACCESS_KEY, SECRET_KEY } = require('./config/aws.config.js');

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-aws');
  grunt.initConfig({
    s3: {
      options: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_KEY,
        bucket: 'photo-gallery-bundle',
        region: 'us-west-1'
      },
      build: {
        cwd: "static",
        src: "bundle.js"
      }
    }
  });


  grunt.registerTask("default", ["s3"]);
}