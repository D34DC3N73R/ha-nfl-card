import {
  LitElement,
  html,
} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";

class NFLCard extends LitElement {

  static get properties() {
    return {
      hass: {},
      _config: {},
    };
  }

  setConfig(config) {
    this._config = config;
  }
  getCardSize() {
    return 5;
  }

  render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    const stateObj = this.hass.states[this._config.entity];
    const outline = this._config.outline;
    const outlineColor = this._config.outline_color;
    const locale = this._config.locale;
    const disableOdds = this._config.disable_odds;
    const teamProb = (stateObj.attributes.team_win_probability * 100).toFixed(0);
    const oppoProb = (stateObj.attributes.opponent_win_probability * 100).toFixed(0);
    var tScr = stateObj.attributes.team_score;
    var oScr = stateObj.attributes.opponent_score;

    var dateForm = new Date (stateObj.attributes.date);
    var gameDay = dateForm.toLocaleDateString(locale, { weekday: 'long' });
    var gameTime = dateForm.toLocaleTimeString(locale, { hour: '2-digit', minute:'2-digit' });
    var gameMonth = dateForm.toLocaleDateString(locale, { month: 'short' });
    var gameDate = dateForm.toLocaleDateString(locale, { day: '2-digit' });
    var outColor = outlineColor;
    
    if (outline == true) {
      var clrOut = 1;
      var toRadius = 4;
      var probRadius = 7;
    }
    if (!this._config.outline || outline == false){
      var clrOut = 0;
      var toRadius = 3;
      var probRadius = 6;
    }
    if (!this._config.outline_color) {
      var outColor = '#ffffff';
    }
    if (stateObj.attributes.possession == stateObj.attributes.team_id) {
      var teamPoss = 1;
    }
    if (stateObj.attributes.possession == stateObj.attributes.opponent_id) {
      var oppoPoss = 1;
    }
    if (Boolean(stateObj.state == 'POST') && Number(tScr) > Number(oScr)) {
        var oppoScore = 0.6;
        var teamScore = 1;
    }
    if (Boolean(stateObj.state == 'POST') && Number(tScr) < Number(oScr)) {
        var oppoScore = 1;
        var teamScore = 0.6;
    }
    if (Boolean(stateObj.state == 'POST') && Number(tScr) == Number(oScr)) {
        var oppoScore = 1;
        var teamScore = 1;
    }


    if (stateObj.attributes.team_homeaway == 'home') {
      var teamColor = stateObj.attributes.team_colors[0];
      var oppoColor = stateObj.attributes.opponent_colors[1];
    }
    if (stateObj.attributes.team_homeaway == 'away') {
      var teamColor = stateObj.attributes.team_colors[1];
      var oppoColor = stateObj.attributes.opponent_colors[0];
    }

    if (!stateObj) {
      return html` <ha-card>Unknown entity: ${this._config.entity}</ha-card> `;
    }
    if (stateObj.state == 'unavailable') {
      return html`
        <style>
          ha-card {padding: 10px 16px;}
        </style>
        <ha-card>
          Sensor unavailable: ${this._config.entity}
        </ha-card> 
      `;
    }

    if (stateObj.state == 'POST') {
      return html`
        <style>
          .card { position: relative; overflow: hidden; padding: 16px 16px 20px; font-weight: 400; }
          .team-bg { opacity: 0.08; position: absolute; top: -30%; left: -20%; width: 58%; z-index: 0; }
          .opponent-bg { opacity: 0.08; position: absolute; top: -30%; right: -20%; width: 58%; z-index: 0; }
          .card-content { display: flex; justify-content: space-evenly; align-items: center; text-align: center; position: relative; z-index: 1; }
          .team { text-align: center; width: 35%;}
          .team img { max-width: 90px; }
          .score { font-size: 3em; text-align: center; }
          .teamscr { opacity: ${teamScore}; }
          .opposcr { opacity: ${oppoScore}; }
          .divider { font-size: 2.5em; text-align: center; opacity: 0; }
          .name { font-size: 1.4em; margin-bottom: 4px; }
          .line { height: 1px; background-color: var(--primary-text-color); margin:10px 0; }
          .status { font-size: 1.2em; text-align: center; margin-top: -21px; }
        </style>
        <ha-card>
          <div class="card">
            <img class="team-bg" src="${stateObj.attributes.team_logo}" />
            <img class="opponent-bg" src="${stateObj.attributes.opponent_logo}" />
            <div class="card-content">
              <div class="team">
                <img src="${stateObj.attributes.team_logo}" />
                <div class="name">${stateObj.attributes.team_name}</div>
                <div class="record">${stateObj.attributes.team_record}</div>
              </div>
              <div class="score teamscr">${tScr}</div>
              <div class="divider">-</div>
              <div class="score opposcr">${oScr}</div>
              <div class="team">
                <img src="${stateObj.attributes.opponent_logo}" />
                <div class="name">${stateObj.attributes.opponent_name}</div>
                <div class="record">${stateObj.attributes.opponent_record}</div>
              </div>
            </div>
            <div class="status">${gameMonth} ${gameDate} - FINAL</div>
          </div>
        </ha-card>
      `;
    }


    if (stateObj.state == 'IN') {
        return html`
          <style>
            .card { position: relative; overflow: hidden; padding: 0 16px 20px; font-weight: 400; }
            .team-bg { opacity: 0.08; position:absolute; top: -20%; left: -20%; width: 58%; z-index: 0; }
            .opponent-bg { opacity: 0.08; position:absolute; top: -20%; right: -20%; width: 58%; z-index: 0; }
            .card-content { display: flex; justify-content: space-evenly; align-items: center; text-align: center; position: relative; z-index: 1; }
            .team { text-align: center; width:35%; }
            .team img { max-width: 90px; }
            .possession, .teamposs, .oppoposs { font-size: 2.5em; text-align: center; opacity: 0; font-weight:900; }
            .teamposs {opacity: ${teamPoss} !important; }
            .oppoposs {opacity: ${oppoPoss} !important; }
            .score { font-size: 3em; text-align: center; }
            .divider { font-size: 2.5em; text-align: center; margin: 0 4px; }
            .name { font-size: 1.4em; margin-bottom: 4px; }
            .line { height: 1px; background-color: var(--primary-text-color); margin:10px 0; }
            .timeouts { margin: 0 auto; width: 70%; }
            .timeouts div.opponent-to:nth-child(-n + ${stateObj.attributes.opponent_timeouts})  { opacity: 1; }
            .timeouts div.team-to:nth-child(-n + ${stateObj.attributes.team_timeouts})  { opacity: 1; }
            .team-to { height: 6px; border-radius: ${toRadius}px; border: ${clrOut}px solid ${outColor}; width: 20%; background-color: ${teamColor}; display: inline-block; margin: 0 auto; position: relative; opacity: 0.2; }
            .opponent-to { height: 6px; border-radius: ${toRadius}px; border: ${clrOut}px solid ${outColor}; width: 20%; background-color: ${oppoColor}; display: inline-block; margin: 0 auto; position: relative; opacity: 0.2; }
            .status { text-align:center; font-size:1.6em; font-weight: 700; }
            .sub1 { font-weight: 700; font-size: 1.2em; margin: 6px 0 2px; }
            .sub1, .sub2, .sub3 { display: flex; justify-content: space-between; align-items: center; margin: 2px 0; }
            .last-play { font-size: 1.2em; width: 100%; white-space: nowrap; overflow: hidden; box-sizing: border-box; }
            .last-play p { display: inline-block; padding-left: 100%; margin: 2px 0 12px; animation : slide 18s linear infinite; }
            @keyframes slide { 0%   { transform: translate(0, 0); } 100% { transform: translate(-100%, 0); } }
            .clock { text-align: center; font-size: 1.4em; }
            .down-distance { text-align: right; }
            .play-clock { font-size: 1.4em; text-align: center; margin-top: -24px; }
            .probability-text { text-align: center; ${disableOdds ? 'display: none;' : ''}}
            .prob-flex { width: 100%; display: flex; justify-content: center; margin-top: 4px; }
            .opponent-probability { width: ${oppoProb}%; background-color: ${oppoColor}; height: 12px; border-radius: 0 ${probRadius}px ${probRadius}px 0; border: ${clrOut}px solid ${outColor}; border-left: 0; transition: all 1s ease-out; }
            .team-probability { width: ${teamProb}%; background-color: ${teamColor}; height: 12px; border-radius: ${probRadius}px 0 0 ${probRadius}px; border: ${clrOut}px solid ${outColor}; border-right: 0; transition: all 1s ease-out; }
            .probability-wrapper { ${disableOdds ? 'display: none;' : 'display: flex;'}; }
            .team-percent { flex: 0 0 10px; padding: 0 10px 0 0; }
            .oppo-percent { flex: 0 0 10px; padding: 0 0 0 10px; text-align: right; }
            .percent { padding: 0 6px; }
            .post-game { margin: 0 auto; }
          </style>
          <ha-card>
            <div class="card">
            <img class="team-bg" src="${stateObj.attributes.team_logo}" />
            <img class="opponent-bg" src="${stateObj.attributes.opponent_logo}" />
            <div class="card-content">
              <div class="team">
                <img src="${stateObj.attributes.team_logo}" />
                <div class="name">${stateObj.attributes.team_name}</div>
                <div class="record">${stateObj.attributes.team_record}</div>
                <div class="timeouts">
                  <div class="team-to"></div>
                  <div class="team-to"></div>
                  <div class="team-to"></div>
                </div>
              </div>
              <div class="teamposs">&bull;</div>
              <div class="score">${stateObj.attributes.team_score}</div>
              <div class="divider">-</div>
              <div class="score">${stateObj.attributes.opponent_score}</div>
              <div class="oppoposs">&bull;</div>
              <div class="team">
                <img src="${stateObj.attributes.opponent_logo}" />
                <div class="name">${stateObj.attributes.opponent_name}</div>
                <div class="record">${stateObj.attributes.opponent_record}</div>
                <div class="timeouts">
                  <div class="opponent-to"></div>
                  <div class="opponent-to"></div>
                  <div class="opponent-to"></div>
                </div>
              </div>
            </div>
            <div class="play-clock">Q${stateObj.attributes.quarter} - ${stateObj.attributes.clock}</div>
            <div class="line"></div>
            <div class="sub2">
              <div class="venue">${stateObj.attributes.venue}</div>
             <div class="down-distance">${stateObj.attributes.down_distance_text}</div>
            </div>
            <div class="sub3">
              <div class="location">${stateObj.attributes.location}</div>
              <div class="network">${stateObj.attributes.tv_network}</div>
            </div>
            <div class="line"></div>
            <div class="last-play">
              <p>${stateObj.attributes.last_play}</p>
            </div>
            <div class="probability-text">Win Probability</div>
            <div class="probability-wrapper">
              <div class="team-percent">${teamProb}%</div>
              <div class="prob-flex">
                <div class="team-probability"></div>
                <div class="opponent-probability"></div>
              </div>
              <div class="oppo-percent">${oppoProb}%</div>
            </div>
          </div>
          </ha-card>
        `;
    }

    if (stateObj.state == 'PRE') {
        return html`
          <style>
            .card { position: relative; overflow: hidden; padding: 0 16px 20px; font-weight: 400; }
            .team-bg { opacity: 0.08; position:absolute; top: -20%; left: -20%; width: 58%; z-index: 0; }
            .opponent-bg { opacity: 0.08; position:absolute; top: -20%; right: -20%; width: 58%; z-index: 0; }
            .card-content { display: flex; justify-content: space-evenly; align-items: center; text-align: center; position: relative; z-index: 1; }
            .team { text-align: center; width: 35%; }
            .team img { max-width: 90px; }
            .name { font-size: 1.4em; margin-bottom: 4px; }
            .line { height: 1px; background-color: var(--primary-text-color); margin:10px 0; }
            .gameday { font-size: 1.4em; margin-bottom: 4px; }
            .gametime { font-size: 1.1em; }
            .sub1 { font-weight: 500; font-size: 1.2em; margin: 6px 0 2px; }
            .sub1, .sub2, .sub3 { display: flex; justify-content: space-between; align-items: center; margin: 2px 0; }
            .last-play { font-size: 1.2em; width: 100%; white-space: nowrap; overflow: hidden; box-sizing: border-box; }
            .last-play p { display: inline-block; padding-left: 100%; margin: 2px 0 12px; animation : slide 10s linear infinite; }
            @keyframes slide { 0%   { transform: translate(0, 0); } 100% { transform: translate(-100%, 0); } }
            .clock { text-align: center; font-size: 1.4em; }
            .down-distance { text-align: right; font-weight: 700; }
            .kickoff { text-align: center; margin-top: -24px; }
            .odds {${disableOdds ? 'display: none;' : ''}}
            .overunder {${disableOdds ? 'display: none;' : '' }}
            .date {${disableOdds ? '' : 'display: none;' }}
            .time {${disableOdds ? '' : 'display: none;' }}
          </style>
          <ha-card>
              <div class="card">
              <img class="team-bg" src="${stateObj.attributes.team_logo}" />
              <img class="opponent-bg" src="${stateObj.attributes.opponent_logo}" />
              <div class="card-content">
                <div class="team">
                  <img src="${stateObj.attributes.team_logo}" />
                  <div class="name">${stateObj.attributes.team_name}</div>
                  <div class="record">${stateObj.attributes.team_record}</div>
                </div>
                <div class="gamewrapper">
                  <div class="gameday">${gameDay}</div>
                  <div class="gametime">${gameTime}</div>
                </div>
                <div class="team">
                  <img src="${stateObj.attributes.opponent_logo}" />
                  <div class="name">${stateObj.attributes.opponent_name}</div>
                  <div class="record">${stateObj.attributes.opponent_record}</div>
                </div>
              </div>
              <div class="line"></div>
              <div class="sub1">
                <div class="kickoff-in">Kickoff ${stateObj.attributes.kickoff_in}</div>
                <div class="odds">${stateObj.attributes.odds}</div>
                <div class="date">${gameDateLong}</div>
              </div>
              <div class="sub2">
                <div class="venue">${stateObj.attributes.venue}</div>
                <div class="overunder"> O/U: ${stateObj.attributes.overunder}</div>
                <div class="time">${gameTime}</div>
              </div>
              <div class="sub3">
                <div class="location">${stateObj.attributes.location}</div>
                <div class="network">${stateObj.attributes.tv_network}</div>
              </div>
            </div>
            </ha-card>
        `;
    }

    if (stateObj.state == 'BYE') {
      return html`
        <style>
          .card { position: relative; overflow: hidden; padding: 16px 16px 20px; font-weight: 400; }
          .team-bg { opacity: 0.08; position: absolute; top: -20%; left: -30%; width: 75%; z-index: 0; }
          .card-content { display: flex; justify-content: space-evenly; align-items: center; text-align: center; position: relative; z-index: 1; }
          .team { text-align: center; width: 50%; }
          .team img { max-width: 90px; }
          .name { font-size: 1.6em; margin-bottom: 4px; }
          .line { height: 1px; background-color: var(--primary-text-color); margin:10px 0; }
          .bye { font-size: 1.8em; text-align: center; width: 50%; }
        </style>
        <ha-card>
          <div class="card">
            <img class="team-bg" src="${stateObj.attributes.team_logo}" />
            <div class="card-content">
              <div class="team">
                <img src="${stateObj.attributes.team_logo}" />
                <div class="name">${stateObj.attributes.team_name}</div>
                <div class="record">${stateObj.attributes.team_record}</div>
              </div>
              <div class="bye">BYE</div>
            </div>
          </div>
        </ha-card>
      `;
    }

    if (stateObj.state == 'NOT_FOUND') {
      return html`
        <style>
          .card { position: relative; overflow: hidden; padding: 16px 16px 20px; font-weight: 400; }
          .team-bg { opacity: 0.08; position: absolute; top: -50%; left: -30%; width: 75%; z-index: 0; }
          .card-content { display: flex; justify-content: space-evenly; align-items: center; text-align: center; position: relative; z-index: 1; }
          .team { text-align: center; width: 50%; }
          .team img { max-width: 90px; }
          .name { font-size: 1.6em; margin-bottom: 4px; }
          .line { height: 1px; background-color: var(--primary-text-color); margin:10px 0; }
          .eos { font-size: 1.8em; line-height: 1.2em; text-align: center; width: 50%; }
        </style>
        <ha-card>
          <div class="card">
            <img class="team-bg" src="https://a.espncdn.com/i/espn/misc_logos/500/nfl.png" />
            <div class="card-content">
              <div class="team">
                <img src="https://a.espncdn.com/i/espn/misc_logos/500/nfl.png" />
              </div>
              <div class="eos">Better Luck<br />Next Year</div>
            </div>
          </div>
        </ha-card>
      `;
    }
  }
}

customElements.define("nfl-card", NFLCard);
