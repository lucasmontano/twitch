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
  [key:string]: string;
}
interface BotData {
  bots: Bot[];
}

class ChatterService {
  public async getViewers(): Promise<Participants> {
    const response = await axios.get<Response>(
      'https://tmi.twitch.tv/group/user/lucas_montano/chatters',
    );

    const { viewers } = response.data.chatters;

    return this.removeBots(viewers);
  }

  private async removeBots(viewers: Participants): Promise<Participants> {
    const response = await axios.get<BotData>('https://api.twitchinsights.net/v1/bots/online');
    const botNames = new Set(response.data.bots.map((bot) => bot[0]));
    const filteredViewers = viewers.filter((viewer) => !botNames.has(viewer));
    return filteredViewers;
  }
}


export default new ChatterService();
