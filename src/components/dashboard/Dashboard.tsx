import React from "react";
import { Route, Switch } from "react-router-dom";
import { CharactersDetails } from "./../character-details/CharactersDetails";
import { ComicsDetails } from "./../comics-details/ComicsDetails";
import { Home } from "./../home/Home";
import { FavouritesCharacters } from "../character-favourites/FavouritesCharacters";
import Characters from "../characters/Characters";
import { Stories } from "../stories/Stories";

const Dashboard: React.FC = () => {
    return <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/characters" component={Characters} />
            <Route path="/characters/:id" component={CharactersDetails} />
            <Route path="/comics/:id" component={ComicsDetails} />
            <Route path="/comics/:id" component={ComicsDetails} />
            <Route path="/favourites" component={FavouritesCharacters} />
            <Route path="/stories" component={Stories} />
            <Route path="*">
            <NoMatch></NoMatch>
            </Route>
    </Switch>
}

export default Dashboard;

const NoMatch = () => {
    return <span>NOT FOUND</span>
}