import Array "mo:base/Array";

actor {
    var tracks : [Text] = [];

    public func add(url : Text) : async () {
        tracks := Array.append<Text>([url], tracks);
    };

    public func getAll() : async [Text] {
        return tracks;
    };
};
