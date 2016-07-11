/**
 * @class Egy modal, felugró ablak létrehozása
 * @param {object} prop - a beállítandó értékeket tartalmazza
 * @param {string} prop.elem - az elem neve, ami a modal lesz
 * @param {string} prop.width - az elem szelessége
 * @param {string} prop.height - az elem magassága
 * @param {string} prop.background - az elem háttérszíne
 * @param {string} prop.color - az elem betűszíne
 * @param {string} prop.html - a modalban lévő tartalom, amely akár html kód is lehet
 */
function ModalKeszito(prop) {
	prop = (typeof prop === 'object') ? prop : {};

	//deklarációk
	this.elem = prop.elem || '#modal'
	this.width = prop.width || '80vw';
	this.height = prop.height || '80vh';
	this.background = prop.background || 'white';
	this.color = prop.color || 'black';
	this.html = prop.html || '';

	this.elem = document.querySelector(this.elem);
	this.container = document.getElementById('container');
	this.tartalom = document.getElementById('kod');

	this.click = 0;
	var self = this;

	/**
	 * @constructor
	 */
	this.construct = function () {
		this.beallitasokElvegzese();
		this.classAdasa(document.documentElement, 'modal');
		this.tartalombaIras(this.html);
		this.esemenyFigyelokAktivalasa();
	}

	/**
	 * @destructor
	 */
	this.destruct = function () {
		this.click = -1;
		this.classLeszedese(document.documentElement, 'modal');
		this.tartalombaIras('');
		this.esemenyFigyelokDeaktivalasa();
	}

	/**
	 * @description A stílusok beállításának végrehajtása
	 */
	this.beallitasokElvegzese = function () {
		for(var index in this) {
			if (typeof this[index] === 'string' && index !== 'html') {
				this.tulajdonsagBeallitasa(index);
			} 
		}
	};

	/**
	 * @param  {string} tulajdonsag - A beállítandó tulajdonság neve
	 */
	this.tulajdonsagBeallitasa = function (tulajdonsag) {
		this.elem['style'][tulajdonsag] = this[tulajdonsag];
	};

	/**
	 * @description A bezáráshoz szükséges események beállításai
	 */
	this.esemenyFigyelokAktivalasa = function () {
		document.addEventListener('click', this.clickEsemeny, false);
	};

	/**
	 * @description A bezáráshoz szükséges események 'megölése'
	 */
	this.esemenyFigyelokDeaktivalasa = function () {
		document.removeEventListener('click', this.clickEsemeny, false);
	};

	/**
	 * @description Ha a dokumentum egyéb részeire klikkel, akkor a modal eltűnik
	 * @param  {object} event - Az esemény objektuma
	 * @param  {object} object - Az osztály objektuma
	 */
	this.documentClick = function (event, object) {
		if (object.click !== 0) {
			if (event.target === object.container || event.target === document.getElementsByTagName('html')[0]) {
				object.destruct();
			}
		}

		object.click++;
	};

	/**
	 * @param  {object} event - Az esemény objektuma
	 */
	this.clickEsemeny = function (event) {
		self.documentClick(event, self);
	};

	this.tartalombaIras = function (szoveg) {
		this.tartalom.innerHTML = szoveg;
	};

	//A legfelül létrehozott constructor elindítása
	this.construct();
}

/**
 * @param  {object} elem - A html objektum, amihez hozzádobjuk a class-t
 * @param  {string} classNev
 * @param  {Function}
 */
ModalKeszito.prototype.classAdasa = function (elem, classNev, callback) {
	elem.className += (elem.className.length > 0) ? ' '+classNev : classNev;
	if (typeof callback === 'function') callback(this);
}

/**
 * @param  {object} elem - A html objektum, amiből törölni szeretnénk a class-t
 * @param  {string} classNev
 * @param  {Function}
 */
ModalKeszito.prototype.classLeszedese = function (elem, classNev, callback) {
	var classok = elem.className.split(' '),
		ezKell = '';
	for (var cv = 0; cv < classok.length; cv++) {
		if (classok[cv] !== classNev) ezKell += classok[cv] + ' ';
	}

	elem.className = ezKell;
	if (typeof callback === 'function') callback(this);
}