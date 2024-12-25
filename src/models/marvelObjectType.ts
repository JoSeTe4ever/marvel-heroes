export enum MarvelObjectType {
    Character = "infinity-stone-space",
    Story = "infinity-stone-time",
    Creator = "infinity-stone-reality",
    Event = "infinity-stone-mind",
    Comic = "infinity-stone-soul",
    Serie = "infinity-stone-power"
}

export function getMarvelObjectType(value: string): MarvelObjectType | undefined {
    switch (value) {
        case "infinity-stone-space":
            return MarvelObjectType.Character;
        case "infinity-stone-time":
            return MarvelObjectType.Story;
        case "infinity-stone-reality":
            return MarvelObjectType.Creator;
        case "infinity-stone-mind":
            return MarvelObjectType.Event;
        case "infinity-stone-soul":
            return MarvelObjectType.Comic;
        case "infinity-stone-power":
            return MarvelObjectType.Serie;
        default:
            return undefined;
    }
}