
/**
 * Formats total seconds to time format: mm:ss.ff
 */
export const toTimeString = (totalSeconds: number) => {
  const dt = new Date(totalSeconds * 1000);
  let minutes = dt.getUTCMinutes().toString();
  let seconds = dt.getUTCSeconds().toString();
  const msSeconds = dt.getUTCMilliseconds().toString();

  if (minutes.length < 2) minutes = `0${minutes}`;
  if (seconds.length < 2) seconds = `0${seconds}`;

  return `${minutes}:${seconds}.${msSeconds}`;
};


/**
 * Loads select box items.
 */
export const loadSelectBoxEnums = () => {
  // load enums
  for (const enumName in _pageSettings.enums) {
    if (!Object.prototype.hasOwnProperty.call(_pageSettings.enums, enumName)) {
      continue;
    }

    const enumKeys = _pageSettings.enums[enumName];
    const selectEls = queryAll<HTMLSelectElement>(`select[data-enum="${enumName}"]`);

    for (const el of selectEls) {
      enumKeys.forEach(key => {
        const optionEl = new Option(`${key}`, key);
        optionEl.setAttribute('data-lang', `_.${enumName}._${key}`);

        el.add(optionEl);
      });
    }
  }
};


/**
 * Updates slideshow interval value accoding to the inputs.
 */
export const onSlideshowIntervalsChanged = () => {
  const intervalFrom = +query<HTMLInputElement>('[name="SlideshowInterval"]').value || 5;
  const intervalTo = +query<HTMLInputElement>('[name="SlideshowIntervalTo"]').value || 5;
  const intervalFromText = toTimeString(intervalFrom);
  const intervalToText = toTimeString(intervalTo);

  const useRandomInterval = query<HTMLInputElement>('[name="UseRandomIntervalForSlideshow"]').checked;

  if (useRandomInterval) {
    query('#Lbl_Slideshow_Interval').innerText = `${intervalFromText} - ${intervalToText}`;
  }
  else {
    query('#Lbl_Slideshow_Interval').innerText = intervalFromText;
  }
};


export const onUseRandomIntervalForSlideshowChanged = () => {
  const useRandomInterval = query<HTMLInputElement>('[name="UseRandomIntervalForSlideshow"]').checked;

  query('#Lbl_Slideshow_IntervalFrom').hidden = !useRandomInterval;
  query('#Section_Slideshow_IntervalTo').hidden = !useRandomInterval;
};


/**
 * Loads settings.
 */
export const loadSettings = () => {
  loadSelectBoxEnums();


  // auto loads settings for String, Number, Boolean
  for (const configKey in _pageSettings.config) {
    if (!Object.prototype.hasOwnProperty.call(_pageSettings.config, configKey)) {
      continue;
    }

    const configValue = _pageSettings.config[configKey];

    // only auto load the settings if the value type is supported
    const canAutoSet = typeof configValue === 'string'
      || typeof configValue === 'number'
      || typeof configValue === 'boolean';
    if (!canAutoSet) continue;


    // find the html element
    const el = query(`[name="${configKey}"]`);
    if (!el) continue;


    // check the tag name and type
    const tagName = el.tagName.toLowerCase();
    if (tagName === 'select') {
      (el as HTMLSelectElement).value = configValue.toString();
    }
    else if (tagName === 'input') {
      const inputType = el.getAttribute('type').toLowerCase();
      const inputEl = el as HTMLInputElement;

      if (inputType === 'radio' || inputType === 'checkbox') {
        inputEl.checked = Boolean(configValue);
      }
      else if (inputType === 'color') {
        const colorHex = configValue.toString() || '#00000000';

        // remove alpha
        inputEl.value = colorHex.substring(0, colorHex.length - 2);
      }
      else {
        inputEl.value = configValue.toString();
      }
    }
  }


  // tab General
  query('#Lnk_StartupDir').innerText = _pageSettings.startUpDir || '(unknown)';
  query('#Lnk_ConfigDir').innerText = _pageSettings.configDir || '(unknown)';
  query('#Lnk_UserConfigFile').innerText = _pageSettings.userConfigFilePath || '(unknown)';

  // tab Mouse & Keyboard > Mouse wheel action
  query<HTMLSelectElement>('#Cmb_MouseWheel_Scroll').value = _pageSettings.config.MouseWheelActions?.Scroll || 'DoNothing';
  query<HTMLSelectElement>('#Cmb_MouseWheel_CtrlAndScroll').value = _pageSettings.config.MouseWheelActions?.CtrlAndScroll || 'DoNothing';
  query<HTMLSelectElement>('#Cmb_MouseWheel_ShiftAndScroll').value = _pageSettings.config.MouseWheelActions?.ShiftAndScroll || 'DoNothing';
  query<HTMLSelectElement>('#Cmb_MouseWheel_AltAndScroll').value = _pageSettings.config.MouseWheelActions?.AltAndScroll || 'DoNothing';

  // tab Slideshow
  onUseRandomIntervalForSlideshowChanged();
  onSlideshowIntervalsChanged();

};


/**
 * Adds input events to slideshow interval inputs.
 */
export const addEventsForTabSlideshow = () => {
  query('[name="UseRandomIntervalForSlideshow"]').addEventListener('input', () => onUseRandomIntervalForSlideshowChanged(), false);
  query('[name="SlideshowInterval"]').addEventListener('input', () => onSlideshowIntervalsChanged(), false);
  query('[name="SlideshowIntervalTo"]').addEventListener('input', () => onSlideshowIntervalsChanged(), false);
};

