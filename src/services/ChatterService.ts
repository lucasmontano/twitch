import axios from 'axios';

type Participants = string[];

interface Response {
  _links: {
    [key: string]: string;
  };
  chatter_count: number;
  chatters: {
    broadcaster: string[];
    vips: string[];
    moderators: string[];
    staff: string[];
    admins: string[];
    global_mods: string[];
    viewers: string[];
  };
}

interface Bot {
  [key: string]: string;
}

interface BotData {
  bots: Bot[];
}

interface ChatterService {
  bots: Set<string>;
  getViewers(): Promise<Participants>;
}

class ChatterService implements ChatterService {
  constructor() {
    this.bots = new Set();
  }

  public async getViewers(): Promise<Participants> {
    const response = await axios.get<Response>(
      'https://tmi.twitch.tv/group/user/lucas_montano/chatters',
    );

    const { viewers } = response.data.chatters;

    return this.removeBots(viewers);
  }

  private async removeBots(viewers: Participants): Promise<Participants> {
    if (!this.bots.size) {
      const response = await axios.get<BotData>(
        'https://api.twitchinsights.net/v1/bots/online',
      );

      response.data.bots.forEach(bot => this.bots.add(bot[0]));
    }

    const filteredViewers: Participants = viewers.filter(
      (viewer) => !this.bots.has(viewer),
    );

    return filteredViewers;
  }
}

export default new ChatterService();
