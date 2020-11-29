import Array "mo:base/Array";

actor Artist {
    type Submission = {
        id : Nat;
        url : Text;
    };

    var nextId : Nat = 0;
    var submissions : [Submission] = [];

    public func add(url_ : Text) : async () {
        let submission : Submission = {
            id = nextId;
            url = url_;
        };
        submissions := Array.append<Submission>([submission], submissions);
        nextId += 1;
    };

    public func getAll() : async [Submission] {
        return submissions;
    };
};
