wakandaQCM
==========

This is a <strong>prototype</strong> sample QCM application.

It lacks a lot of features and definitly needs to have a new and better UI/UX ( PR welcomed :) ).
It is also plenty buggy for instance and has just been made as a "fast prototyped training sample application".
It is NOT meant to be a tutorial, I just did it to train myself with Wakanda.
I would NOT recommand using it in production, though you probably somehow could with a few fixes here and there.

Have fun hacking it!

Getting Started
========

Creating Questions, Answers, Keywords, and binding all of them together.
======

Make sure to do them in one go though... it's buggish...
Also, when you add new entries in the DataGrids, do not forget to blur the rows to make sure the new entries are saved in the DB!!!

1.1 Run the page CreateQuestion
1.2 Add a question in the DataGrid
1.3 Carefully think about all the answers you want to use for this question, there is no going back ;)
1.4 Add the necessary answers, and select the ones you want to bind to the question.
1.5 Carefully think about the necessary keywords, here again, there is no going back :)
1.6 Add and select the keywords you want to bind to the question.
1.7 Click on the "Bind selected question with selected answers and keywords" button.
1.8 That's it, you've created your first question, its answers and keywords :)
1.9 IF you failed one step in the process, i'd recommand reloading the page as the DataGrid stability is not examplary at the moment.
2.0 At that point, I would recommand reloading the page.
2.1 In the bottom DataGrid, the left one, you will see the answers bound to the question. Notice the first column "is right". Here you should "tick" the right answers for your questions. Again do not forget to blur the rows after ticking, to save the state in the DataBase.

Running a QCM
======

Just go to StartQCM page, put any username & email you want (btw there is no real check on the username, might be also worth adding an ID field to the user model, and just make email unique. Whomever wants to have fun with that, feel free to do so and make a Pull Request).
Click on the start Button, answer your random questions, and see your score.


Congratulations, I guess? ;)