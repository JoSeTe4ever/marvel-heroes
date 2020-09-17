import React from "react";
import { Route, Switch } from "react-router-dom";
import { CharactersDetails } from "./../character-details/CharactersDetails";
import { ComicsDetails } from "./../comics-details/ComicsDetails";
import { Home } from "./../home/Home";
import { FavouritesCharacters } from "../character-favourites/FavouritesCharacters";

const Dashboard: React.FC = () => {
    return <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/characters/:id" component={CharactersDetails} />
            <Route path="/favourites" component={FavouritesCharacters} />
            <Route path="/comics" component={ComicsDetails} />
        <Route path="*">
            <NoMatch></NoMatch>
        </Route>
    </Switch>
}

export default Dashboard;

const NoMatch = () => {
    return <span>NOT FOUND</span>
}