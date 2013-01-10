<h1>wakandaQCM</h1>

This is a <strong>prototype</strong> sample QCM application.<br/>
You can open it with the DEV branch of Wakanda.<br/>

It lacks a lot of features and definitly needs to have a new and better UI/UX ( PR welcomed :) ).<br/>
It is also plenty buggy for instance and has just been made as a "fast prototyped training sample application".<br/>
It is NOT meant to be a tutorial, I just did it to train myself with Wakanda.<br/>
I would NOT recommand using it in production, though you probably somehow could with a few fixes here and there.<br/>

Have fun hacking it!<br/>

<h2>Getting Started</h2>

<h3>Creating Questions, Answers, Keywords, and binding all of them together</h3>

Make sure to do them in one go though... it's buggish...<br/>
Also, when you add new entries in the DataGrids, do not forget to blur the rows to make sure the new entries are saved in the DB!!!<br/>
<ol>
<li>Run the page CreateQuestion</li>
<li>Add a question in the DataGrid</li>
<li>Carefully think about all the answers you want to use for this question, there is no going back ;)</li>
<li>Add the necessary answers, and select the ones you want to bind to the question.</li>
<li>Carefully think about the necessary keywords, here again, there is no going back :)</li>
<li>Add and select the keywords you want to bind to the question.</li>
<li>Click on the "Bind selected question with selected answers and keywords" button.</li>
<li>That's it, you've created your first question, its answers and keywords :)</li>
<li>IF you failed one step in the process, i'd recommand reloading the page as the DataGrid stability is not examplary at the moment.</li>
<li>At that point, I would recommand reloading the page.</li>
<li>In the bottom DataGrid, the left one, you will see the answers bound to the question. Notice the first column "is right". Here you should "tick" the right answers for your questions. Again do not forget to blur the rows after ticking, to save the state in the DataBase.</li>
</ol>

<h3>Running a QCM</h3>

Just go to StartQCM page, put any username & email you want (btw there is no real check on the username, might be also worth adding an ID field to the user model, and just make email unique. Whomever wants to have fun with that, feel free to do so and make a Pull Request).<br/>
Click on the start Button, answer your random questions, and see your score.


Congratulations, I guess? ;)