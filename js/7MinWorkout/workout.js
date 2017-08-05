

angular.module('7minWorkout').controller('WorkoutController', function ($scope) {
    function Exercices(args) {
        this.name = args.name;
        this.title = args.name;
        this.description = args.description;
        this.image = args.image;
        this.related = {};
        this.related.videos = arg.videos;
        this.nameSound=args.nameSound;
        this.procedure=args.procedure;
    }
    function WorkoutPlan(args) {
        this.exercises=[];
        this.name=args.name;
        this.title=args.title;
        this.restBetweenExercise=args.restBetweenExercise;
    }
});


