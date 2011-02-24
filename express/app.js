var express = require('express'),
    sys = require('sys');

// The port the server will use.
// Set this to usable port number to run the example.
var port = 4000;

// Path to our public directory
var pub = __dirname + '/public';

// Auto-compile sass to css with "compiler"
// and then serve with connect's staticProvider
var app = express.createServer(
  express.compiler({ src: pub, enable: ['sass'] }),
  express.staticProvider(pub)
);

// Optional since express defaults to CWD/views

app.set('views', __dirname + '/views');

// Set our default template engine to "jade"
// which prevents the need for extensions
// (although you can still mix and match)
app.set('view engine', 'jade');

// Here we use the bodyDecoder middleware
// to parse urlencoded request bodies
// which populates req.body
app.use(express.bodyDecoder());
    
// The methodOverride middleware allows us
// to set a hidden input of _method to an arbitrary
// HTTP method to support app.put(), app.del() etc
app.use(express.methodOverride());

// Required by session
app.use(express.cookieDecoder());

// Required by req.flash() for persistent
// notifications
app.use(express.session({ secret: 'Freedom!' }));

app.get('/', function(req, res){
  // get ?name=foo
  var name = req.param('name') || '';
  
  // Switch the button label based if we have a name
  var label = name ? 'Update' : 'Save';

  // Buffer all flash messages.
  // Typically this would all be done in a template
  // however for illustration purposes we iterate
  // here.
  
  // The messages in req.flash() persist until called,
  // at which time they are flushed from the session
  msgs = req.flash();

  // Render the index.jade file pasing variables from this request.
  res.render('index', {locals: {msgs: msgs, name: name, label: label}});

});

app.post('/', function(req, res){
  if (req.body.name) {
    // Typically here we would create a resource
    req.flash('info', 'Saved ' + req.body.name);
    res.redirect('/?name=' + req.body.name);
  } else {
    req.flash('error', 'Error: name required');
    res.redirect('/');
  }
});

app.put('/', function(req, res){
  // Typically here we would update a resource
  req.flash('info', 'Updated ' + req.body.name);
  res.redirect('/?name=' + req.body.name);
});

app.listen(port);
console.log('Express app started on port ' + port);

