import { Client } from 'discord.js';
import { CommandService } from '../services/CommandService';
import { EventService } from '../services/EventService';
import { MusicService } from '../services/MusicService';

export interface BotOptions {
    client: Client;
    commandService: CommandService;
    eventService: EventService;
    musicService: MusicService;
}

export class Bot {
    public readonly client: Client;
    public readonly commandService: CommandService;
    public readonly eventService: EventService;
    public readonly musicService: MusicService;

    constructor(options: BotOptions) {
        this.client = options.client;
        this.commandService = options.commandService;
        this.eventService = options.eventService;
        this.musicService = options.musicService;
    }

    public init() {
        this.eventService.setupEventListeners(this);
        this.musicService.setupEventListeners(this);
    }

    public async login(token: string) {
        try {
            await this.client.login(token);

            console.log('Established a connection to Discord');
        } catch (err) {
            throw new Error('Failed to establish a connection to Discord');
        }
    }
}