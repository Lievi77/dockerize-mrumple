const express = require("express");
const Reddit = require("reddit");
const Sentiment = require("sentiment");
var sentiment = new Sentiment();
var reddit_creds = require("./reddit_creds.json");


const db = require('./database/queries');


const reddit = new Reddit({
  username:  reddit_creds.username,
  password:  reddit_creds.password,
  appId: 		 reddit_creds.appId,
  appSecret: reddit_creds.appSecret,
  userAgent: 'SAL/0.0.1 (http://uottawa.ca)'
})

const app = express();
const port = 4000;

app.get("/test", (req, res) => {
  res.json({ text: "Hello World" });
});

app.get("/avgRating/:username", db.getAverageRating);

app.get("/user/:username/wordcloud", async (req, res) => {
	const punch = await reddit.get('/user/' + req.params.username + "/comments");
	const comments = punch["data"]["children"];
	let bodys = {};

	for (let i = 0; i < comments.length; i++) {
		let curr_comment =comments[i]["data"]["body"].replace(/[^\w\s]/gi, ' ').toLowerCase();
		const iterate_over = curr_comment.split(" ");

		for(let i = 0; i < iterate_over.length; i++) {
			let curr_token = iterate_over[i];
			if(curr_token.length > 4 && !(curr_token.includes("\n")) ) {
				if(curr_token in bodys) {
					bodys[curr_token] += 1
				} else {
					bodys[curr_token] = 1
				}
			}
		}

	}

	let to_ret = [];

	for(const [token, number] of Object.entries(bodys)) {
		to_ret.push([token, number]);
	}
	to_ret.sort((f,s) => { return s[1] - f[1];});
	to_ret = to_ret.slice(0,40);
	let words = [];
	for(let i = 0; i < to_ret.length; i++) {
		words.push({text: to_ret[i][0], value: to_ret[i][1]})
	}
	return res.json(words);
});

app.get("/user/:username/activity", async (req,res) => {
	let keep = true;
	let words;
	let after = null;
	let limit = 100;
	let count = 0;
	const MAX = 20;
	let didFirst = false;
	let year_to_month_dict = {};
	while(keep) {
		if(!didFirst) {
			words = await reddit.get('/user/' + req.params.username + '/overview',
			{
				limit: limit,

			});

			didFirst = true;
		} else {
			words = await reddit.get('/user/' + req.params.username + '/overview',
			{
				limit: limit,
				after: after,
				count: count
			});
		}
		let comments = words.data.children;
		let curr_comment;
		count += comments.length;
		after = words.data.after;

		for(let i = 0; i < comments.length; i++) {
			curr_comment = comments[i].data;
			if(curr_comment.body) {
				let curr_date = new Date(curr_comment.created_utc*1000);
				let curr_month = curr_date.getMonth();
				let curr_year = curr_date.getYear() + 1900;
				let curr_score = curr_comment.score;
				if(curr_year in year_to_month_dict) {
					if(curr_month in year_to_month_dict[curr_year]) {
						year_to_month_dict[curr_year][curr_month] += curr_score;
					} else {
						year_to_month_dict[curr_year][curr_month] = curr_score;
					}
				} else {
					year_to_month_dict[curr_year] = {};
					year_to_month_dict[curr_year][curr_month] = curr_score;
				}
			} else {
				keep = false;
				break;

			}
		}

		if(after == null) {
			keep = false;
		}
	}
	return res.json(year_to_month_dict);
});

app.get("/user/:username", async (req, res) => {
  const dog = await reddit.get('/user/' + req.params.username + "/about");
	const punch = await reddit.get('/user/' + req.params.username + "/comments");
	const comments = punch["data"]["children"];
	let subreddits = {};
	let most_positive_score = -Number.MAX_VALUE;
	let least_positive_score = Number.MAX_VALUE;
	let most_positive_post;
	let least_positive_post;
	let controversy_rating = 0;
	let most_pos_link;
	let least_pos_link;
	for(let i = 0; i < comments.length; i++) {
		let curr_comment = comments[i]["data"];

		let analysis_score = sentiment.analyze(curr_comment["body"])["score"];
		if(analysis_score > most_positive_score) {
			most_positive_post = curr_comment["body"];
			most_pos_link = "https://reddit.com" + curr_comment["permalink"];

			most_positive_score = analysis_score;
		}

		if (analysis_score < least_positive_score) {
			least_positive_post = curr_comment["body"];
			least_pos_link = "https://reddit.com" + curr_comment["permalink"];
			least_positive_score = analysis_score;
		}
		controversy_rating += analysis_score;
		if(curr_comment["subreddit"] in subreddits) {
			subreddits[curr_comment["subreddit"]] += 1;
		} else {
			subreddits[curr_comment["subreddit"]] = 1;
		}


	}
	controversy_rating /= comments.length;
	dog["extra"] = {controversy_rating: controversy_rating, subreddits: subreddits, most_pos_score: most_positive_score, most_pos_post: most_positive_post, most_pos_link: most_pos_link,least_post_score: least_positive_score, least_pos_post: least_positive_post, least_pos_link: least_pos_link}
	res.json(dog);

});

app.get("/sentiment/:text", (req, res) => {
	res.json(sentiment.analyze(req.params.text));
});

app.post("/uploadRating/:username", db.postRating);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
