import cssRunner from './css';
import jsRunner from './javascript';
import sassRunner from './sass';
import htmlRunner from './html';
import hbsRunner from './handlebars';

const runners = config => {
	const {
		extension,
		src,
		out,
		templateDataPath
	} = config;

	switch (extension) {
	case '.html': htmlRunner(src, out); break;
	case '.css': cssRunner(src, out); break;
	case '.js': jsRunner(src, out); break;
	case '.sass': sassRunner(src, out); break;
	case '.scss': sassRunner(src, out); break;
	case '.hbs': hbsRunner(src, out, templateDataPath); break;
	}
};

export default runners;
