//third party
import React from 'react';
import { Switch, Route } from 'react-router';

import './styles/App.css';
import Home from './Home';
import Category from './Category';
import CreateBlog from './CreateBlog';
import Blog from './Blog';
import BlogCategory from './BlogCategory';
import EditBlog from './EditBlog';

const App = () => {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' render={() => <Home />} />
        <Route exact path='/blog/category' render={() => <BlogCategory />} />
        <Route
          exact
          path='/blog/category/:cName'
          render={(routeProps) => <Category details={routeProps} />}
        />
        <Route
          exact
          path='/blog/tweet/:cName'
          render={(routeProps) => <CreateBlog details={routeProps} />}
        />
        <Route
          exact
          path='/blog/:id'
          render={(routeProps) => <Blog details={routeProps} />}
        />
        <Route
          exact
          path='/blog/edit/:cName/:id'
          render={(routeProps) => <EditBlog details={routeProps} />}
        />
      </Switch>
    </div>
  );
};

export default App;
