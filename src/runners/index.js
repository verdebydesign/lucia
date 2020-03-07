import cssRunner from './css';
import jsRunner from './javascript';
import sassRunner from './sass';
import htmlRunner from './html';
import hbsRunner from './handlebars';

const runners = (config, cb = () => {}) => {
	const {
		extension,
		src,
		out,
		templateDataPath
	} = config;

	switch (extension) {
	case '.html': htmlRunner(src, out, cb); break;
	case '.css': cssRunner(src, out, cb); break;
	case '.js': jsRunner(src, out, cb); break;
	case '.sass': sassRunner(src, out, cb); break;
	case '.scss': sassRunner(src, out, cb); break;
	case '.hbs': hbsRunner(src, out, cb, templateDataPath); break;
	}
};

export default runners;
