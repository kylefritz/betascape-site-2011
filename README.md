#Betascape Site

##Build Instructions:

This site is made with two ruby-powered technologies: [Jekyll](https://github.com/mojombo/jekyll) (static
site geneator) and [Compass](https://github.com/chriseppstein/compass) (sass/css framework++).


The final site output goes into `_site`, this is what gets served to
browsers. To build that you need: RVM, Ruby 1.9.2, Jekyll, & Compass.

get rvm

`$ bash < <( curl http://rvm.beginrescueend.com/releases/rvm-install-head )`

add the following to your bashrc

`[[ -s "$HOME/.rvm/scripts/rvm" ]] && . "$HOME/.rvm/scripts/rvm"`

get a new terminal session or source bashrc

compile/install ruby 1.9.2 and set to default

`$ rvm install 1.9.2 && rvm --default use 1.9.2`

clone betascape
`$ git clone git://github.com/kylefritz/betascape-site-2011.git betascape`

terminal 1:

`$ gem install bundler && cd betascape && bundle install`

terminal 2 (compass rebuild stylesheets while jekyll rebuild and serve
site):

`$ foreman start`

try site on localhost:4000


##TODO:

 * do the mobile/media-query version
 * sync little home/about select thing in nav
