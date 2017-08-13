angular.module('7minWorkout').controller('WorkoutController', ['$scope', '$interval', function ($scope, $interval) {
    //Controller implementations
    console.log('WorkoutController created.');
    $scope.myDate = new Date(2014, 7, 7, 10, 30, 50);

    function WorkoutPlan(args) {
        this.exercises = [];
        this.name = args.name;
        this.title = args.title;
        this.restBetweenExercise = args.restBetweenExercise;

        this.totalWorkoutDuration = function () {
            if (this.exercises.length == 0) return 0;
            var total = 0;
            angular.forEach(this.exercises, function (exercise) {
                total = total + exercise.duration;
            });
            return this.restBetweenExercise * (this.exercises.length - 1) + total;
        }
    };

    function Exercise(args) {
        this.name = args.name;
        this.title = args.title;
        this.description = args.description;
        this.instructions = args.instructions;
        this.image = args.image;
        this.related = {};
        this.related.videos = args.videos;
        this.related.variations = args.variations;
        this.nameSound = args.Sound;
        this.procedure = args.procedure;
    }

    var restExercise;
  

    var createWorkout = function () {
        var workout = new WorkoutPlan({
            name: "7MinWorkout",
            title: "7 min Wrokout",
            restBetweenExercise: 10
        });
        workout.exercises.push({
            exercise: new Exercise({
                name: "jumpingJacks",
                title: "Jumping Jacks",
                description: "Jumping Jacks.",
                image: "img/JumpingJacks.png",
                videos: ['https://www.youtube.com/embed/c4DAnQ6DtF8',
                    'https://www.youtube.com/embed/RB5Mk_rcFC0'],
                variations: [],
                procedure: "Assume an erect position, with while in air, bring your ise your arms up over your head."
            }),
            duration: 30
        });
        workout.exercises.push({
            exercise: new Exercise({
                name: "wallSit",
                title: "Wall Sit",
                description: "Wall Sit.",
                image: "img/wallsit.png",
                videos: [],
                variations: [],
                procedure: ""

            }),
            duration: 30
        });
        workout.exercises.push({
            exercise: new Exercise({
                name: "pushUp",
                title: "Push Up",
                description: "Discription about pushup.",
                image: "img/pushup.png",
                videos: ["https://www.youtube.com/embed/Eh00_rniF8E", "https://www.youtube.com/embed/ZWdBqFLNljc", "https://www.youtube.com/embed/UwRLWMcOdwI", "https://www.youtube.com/embed/ynPwl6qyUNM", "https://www.youtube.com/embed/OicNTT2xzMI"],
                variations: ["Planche push-ups", "Knuckle push-ups", "Maltese push-ups", "One arm versions"],
                procedure: ""
            }),
            duration: 30
        });
        workout.exercises.push({
            exercise: new Exercise({
                name: "crunches",
                title: "Abdominal Crunches",
                description: "Abdominal Crunches.",
                image: "img/crunches.png",
                videos: [],
                variations: [],
                procedure: ""
            }),
            duration: 30
        });
        workout.exercises.push({
            exercise: new Exercise({
                name: "stepUpOntoChair",
                title: "Step Up Onto Chair",
                description: "Step Up Onto Chair.",
                image: "img/stepUpOntoChair.jpeg",
                videos: [],
                variations: [],
                procedure: ""
            }),
            duration: 30
        });
        workout.exercises.push({
            exercise: new Exercise({
                name: "squat",
                title: "Squat",
                description: "Squat.",
                image: "img/squat.png",
                videos: [],
                variations: [],
                procedure: ""
            }),
            duration: 30
        });
        workout.exercises.push({
            exercise: new Exercise({
                name: "tricepdips",
                title: "Tricep Dips On Chair",
                description: "Tricep Dips On Chair.",
                image: "img/tricepdips.jpg",
                videos: [],
                variations: [],
                procedure: ""
            }),
            duration: 30
        });
        workout.exercises.push({
            exercise: new Exercise({
                name: "plank",
                title: "Plank",
                description: "Plank.",
                image: "img/plank.png",
                videos: [],
                variations: [],
                procedure: ""
            }),
            duration: 30
        });
        workout.exercises.push({
            exercise: new Exercise({
                name: "highKnees",
                title: "High Knees",
                description: "High Knees.",
                image: "img/highknees.png",
                videos: [],
                variations: [],
                procedure: ""
            }),
            duration: 30
        });
        workout.exercises.push({
            exercise: new Exercise({
                name: "lunges",
                title: "Lunges",
                description: "Lunges.",
                image: "img/lunges.png",
                videos: [],
                variations: [],
                procedure: ""
            }),
            duration: 30
        });
        workout.exercises.push({
            exercise: new Exercise({
                name: "pushupNRotate",
                title: "Pushup And Rotate",
                description: "Pushup And Rotate.",
                image: "img/pushupNRotate.jpg",
                videos: [],
                variations: [],
                procedure: ""
            }),
            duration: 30
        });
        workout.exercises.push({
            exercise: new Exercise({
                name: "sidePlank",
                title: "Side Plank",
                description: "Side Plank.",
                image: "img/sideplank.png",
                videos: [],
                variations: [],
                procedure: ""
            }),
            duration: 30
        });
        return workout;
    }
    var startWorkout = function () {
        $scope.workoutPlan = createWorkout();
        restExercise = {
            exercise: new Exercise({
                name: "rest",
                title: "Relax!",
                description: "Relax a bit!",
                image: "img/rest.png"
            }),
            duration:  $scope.workoutPlan.restBetweenExercise
        };
        $scope.workoutTimeRemaining =  $scope.workoutPlan.totalWorkoutDuration();
        // Existing code. Removed for clarity
        $interval(function () {
            $scope.workoutTimeRemaining = $scope.workoutTimeRemaining - 1;
        }, 1000, $scope.workoutTimeRemaining);
        startExercise( $scope.workoutPlan.exercises.shift());
    };
    var startExercise = function (exercisePlan) {
        $scope.currentExercise = exercisePlan;
        $scope.currentExerciseDuration = 0;
        $interval(function () {
            ++$scope.currentExerciseDuration;
        }, 1000, $scope.currentExercise.duration)
            .then(function () {
                var next = getNextExercise(exercisePlan);
                if (next) {
                    startExercise(next);
                } else {
                    console.log('Workout complete!');
                }
            });
    };
    var getNextExercise = function (currentExercisePlan) {
        var nextExercise = null;
        if (currentExercisePlan === restExercise) {
            nextExercise =  $scope.workoutPlan.exercises.shift();
        } else {
            if ( $scope.workoutPlan.exercises.length != 0) {
                nextExercise = restExercise;
            }
        } return nextExercise;
    };
    $scope.$watch('currentExerciseDuration', function (nVal) {
        if (nVal == $scope.currentExercise.duration) {
            var next = getNextExercise($scope.currentExercise);
            if (next) {
                startExercise(next);
            } else {
                console.log("Workout complete!");
            }
        }
    });
    var init = function () {
        startWorkout();
    };
    init();


}]);