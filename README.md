Matt's sample app using Couchbase and AngularJS

To install do the following:

   * Download & Install Couchbase beta2 (Make sure you follow the instructions for your OS... ;-))
     * Ubuntu: http://packages.couchbase.com/releases/3.0.0-beta2/couchbase-server_3.0.0-beta2_x86_64_ubuntu_1204.deb
     * OSX: http://packages.couchbase.com/releases/3.0.0-beta2/couchbase-server_3.0.0-beta2_x86_64.zip

   * Ubuntu:
      * Run “sudo apt-get install node”
      * Run “sudo apt-get install npm”
      * Run “npm install express”
      * Run “sudo apt-get install git”

   * OSX:
      * Install HomeBrew (http://brew.sh/)
      * Run "brew install node"
      * Run "brew install npm"

   * Pull down the code “git clone https://github.com/scotch-io/node-todo.git”

   * Install couchbase SDK 2.0 “npm install https://registry.npmjs.org/couchbase/-/couchbase-2.0.0-beta.tgz”

   * Resolve Ununtu node clash “sudo update-alternatives --install /usr/bin/node node /usr/bin/nodejs 10” - Not working properly - Had to recompile the couch base client with nodes rather than node in binding.gyp

   * Fell back to normal client
   
   * Run “npm install -g nodemon"

   * Run “nodemon server.js" to get the app running

   * Browse to http://127.0.0.1:3000 to view the app

Note: Only ever do “sudo node rebuild”

Enjoy! :-)