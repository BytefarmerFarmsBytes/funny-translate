const random = require('random');
const translatte = require('translatte');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

var eng = ''
var lastLang = ''
var lastText = ''
var times = 0
var textToTranslate = ''
const longLangs = ['Afrikaans','Albanian','Amharic','Arabic','Armenian','Azerbaijani','Basque','Belarusian','Bengali','Bosnian','Bulgarian','Catalan','Cebuano','Chichewa','Chinese (Simplified)','Chinese (Simplified)','Chinese (Traditional)','Corsican','Croatian','Czech','Danish','Dutch','English','Esperanto','Estonian','Filipino','Finnish','French','Frisian','Galician','Georgian','German','Greek','Gujarati','Haitian Creole','Hausa','Hawaiian','Hebrew','Hebrew','Hindi','Hmong','Hungarian','Icelandic','Igbo','Indonesian','Irish','Italian','Japanese','Javanese','Kannada','Kazakh','Khmer','Korean','Kurdish (Kurmanji)','Kyrgyz','Lao','Latin','Latvian','Lithuanian','Luxembourgish','Macedonian','Malagasy','Malay','Malayalam','Maltese','Maori','Marathi','Mongolian','Myanmar (Burmese)','Nepali','Norwegian','Pashto','Persian','Polish','Portuguese','Punjabi','Romanian','Russian','Samoan','Scots Gaelic','Serbian','Sesotho','Shona','Sindhi','Sinhala','Slovak','Slovenian','Somali','Spanish','Sundanese','Swahili','Swedish','Tajik','Tamil','Telugu','Thai','Turkish','Ukrainian','Urdu','Uzbek','Vietnamese','Welsh','Xhosa','Yiddish','Yoruba','Zulu']
const langs = ['af','sq','am','ar','hy','az','eu','be','bn','bs','bg','ca','ceb','ny','zh','zh-cn','zh-tw','co','hr','cs','da','nl','en','eo','et','tl','fi','fr','fy','gl','ka','de','el','gu','ht','ha','haw','he','iw','hi','hmn','hu','is','ig','id','ga','it','ja','jw','kn','kk','km','ko','ku','ky','lo','la','lv','lt','lb','mk','mg','ms','ml','mt','mi','mr','mn','my','ne','no','ps','fa','pl','pt','pa','ro','ru','sm','gd','sr','st','sn','sd','si','sk','sl','so','es','su','sw','sv','tg','ta','te','th','tr','uk','ur','uz','vi','cy','xh','yi','yo','zu'];
const question1 = () => {
	return new Promise((resolve, reject) => {
		readline.question('What do you wanna translate, young jedi? \n', l => {
			textToTranslate = l
			resolve()		
		});
	});
};

const question2 = () => {
	return new Promise((resolve, reject) => {
		readline.question('And how many times? \n', f => {
			times = f
			console.log('tranlating "' + textToTranslate + '" into random languages ' + times + ' times')
			resolve()
		});
	});
};

const question3 = () => {
	return new Promise((resolve, reject) => {
		readline.question('show english progress??? y/n \n', g => {
			if (g == 'y' || g == 'n' || g == 'Y' || g == 'N'){
				eng = g
			} else{
				console.log('say y or n')
			}
			resolve()
		});
	});
};

const main = async () => {
	await question1()
  	await question2()
  	await question3()
  	readline.close()
  	var newTimes = times
  	textToTranslate.toString()
  	while(newTimes>=0){
  	var randomNum = random.int((-1),(105));
		var currentLang = langs[randomNum];

		if(newTimes <= 0){
			await translatte(lastText, {from: lastLang, to: 'en'}).then(res => {
				console.log('\nfinal translation: ' + res.text)
			}).catch(err => {
    			console.error(err);
			});
		}
		if(times == newTimes){
			await translatte(textToTranslate, {to: currentLang}).then(res => {
				lastLang = currentLang
    			lastText = res.text
    			console.log('\n' + 'language: ' + currentLang + '/' + longLangs[randomNum] + '\n' + 'result: ' + lastText)
			}).catch(err => {
    			console.error(err);
			});
		} else if(newTimes > 0) {
			await translatte(lastText, {from: lastLang, to: currentLang}).then(res => {
				lastLang = currentLang
    			lastText = res.text
    			console.log('\n' + 'language: ' + currentLang + '/' + longLangs[randomNum] + '\n' + 'result: ' + lastText)
			}).catch(err => {
    			console.error(err);
			});
		}
		if(eng == 'y' && newTimes > 0|| eng == 'Y' && newTimes > 0){
			await translatte(lastText, {from: lastLang, to: 'en'}).then(res => {
				console.log('english translateion: ' + res.text)
			}).catch(err => {
    			console.error(err);
			});
		}
		var timeLeft = 0
		if(eng == 'y' && newTimes >= -1|| eng == 'Y' && newTimes >= -1){
			var addedTimes = times - newTimes
			timeLeft = newTimes * 4
			console.log(addedTimes + '/' + times)
		} else {
			var addedTimes = times - newTimes
			timeLeft = newTimes * 2
			console.log(addedTimes + '/' + times)
		}
		console.log('time left: ' + timeLeft + ' seconds (estimated)')
		newTimes = newTimes - 1
  	}
}

main()