import { Manager } from "./Manager";
import { Node, NodeStats } from "./Node";
import { Player, Track, UnresolvedTrack } from "./Player";
import { Queue } from "./Queue";
/** @hidden */
export declare const unresolvedTrackSymbol: unique symbol;
export declare abstract class TrackUtils {
    static trackPartial: string[] | null;
    static setTrackPartial(partial: string[]): void;
    /**
     * Checks if the provided argument is a valid Track or UnresolvedTrack, if provided an array then every element will be checked.
     * @param trackOrTracks
     */
    static validate(trackOrTracks: unknown): boolean;
    /**
     * Checks if the provided argument is a valid UnresolvedTrack.
     * @param track
     */
    static isUnresolvedTrack(track: unknown): boolean;
    /**
     * Checks if the provided argument is a valid Track.
     * @param track
     */
    static isTrack(track: unknown): boolean;
    /**
     * Builds a Track from the raw data from Lavalink and a optional requester.
     * @param data
     * @param requester
     */
    static build(data: TrackData, requester?: unknown): Track | undefined;
    /**
     * Builds a UnresolvedTrack to be resolved before being played  .
     * @param query
     * @param requester
     */
    static buildUnresolved(query: string, requester?: unknown): UnresolvedTrack;
}
export declare abstract class Structure {
    /**
     * Extends a class.
     * @param name
     * @param extender
     */
    static extend<K extends keyof Extendable, T extends Extendable[K]>(name: K, extender: (target: Extendable[K]) => T): T;
    /**
     * Get a structure from available structures by name.
     * @param name
     */
    static get<K extends keyof Extendable>(name: K): Extendable[K];
}
export declare class Plugin {
    load(manager: Manager): void;
}
export declare type Sizes = "0" | "1" | "2" | "3" | "default" | "mqdefault" | "hqdefault" | "maxresdefault";
export declare type LoadType = "TRACK_LOADED" | "PLAYLIST_LOADED" | "SEARCH_RESULT" | "LOAD_FAILED" | "NO_MATCHES";
export declare type State = "CONNECTED" | "CONNECTING" | "DISCONNECTED" | "DISCONNECTING" | "DESTROYING";
export declare type PlayerEvents = TrackStartEvent | TrackEndEvent | TrackStuckEvent | TrackExceptionEvent | WebSocketClosedEvent;
export declare type PlayerEventType = "TrackStartEvent" | "TrackEndEvent" | "TrackExceptionEvent" | "TrackStuckEvent" | "WebSocketClosedEvent";
export declare type TrackEndReason = "FINISHED" | "LOAD_FAILED" | "STOPPED" | "REPLACED" | "CLEANUP";
export declare type Severity = "COMMON" | "SUSPICIOUS" | "FAULT";
export interface TrackData {
    track: string;
    info: TrackDataInfo;
}
export interface TrackDataInfo {
    title: string;
    identifier: string;
    author: string;
    length: number;
    isSeekable: boolean;
    isStream: boolean;
    uri: string;
}
export interface Extendable {
    Player: typeof Player;
    Queue: typeof Queue;
    Node: typeof Node;
}
export interface VoiceState {
    op: "voiceUpdate";
    guildId: string;
    event: VoiceEvent;
    sessionId?: string;
}
export interface VoiceEvent {
    token: string;
    guild_id: string;
    endpoint: string;
}
export interface VoicePacket {
    t?: string;
    d: Partial<{
        guild_id: string;
        user_id: string;
        session_id: string;
        channel_id: string;
    }> & VoiceEvent;
}
export interface NodeMessage extends NodeStats {
    type: PlayerEventType;
    op: "stats" | "playerUpdate" | "event";
    guildId: string;
}
export interface PlayerEvent {
    op: "event";
    type: PlayerEventType;
    guildId: string;
}
export interface Exception {
    severity: Severity;
    message: string;
    cause: string;
}
export interface TrackStartEvent extends PlayerEvent {
    type: "TrackStartEvent";
    track: string;
}
export interface TrackEndEvent extends PlayerEvent {
    type: "TrackEndEvent";
    track: string;
    reason: TrackEndReason;
}
export interface TrackExceptionEvent extends PlayerEvent {
    type: "TrackExceptionEvent";
    exception?: Exception;
    error: string;
}
export interface TrackStuckEvent extends PlayerEvent {
    type: "TrackStuckEvent";
    thresholdMs: number;
}
export interface WebSocketClosedEvent extends PlayerEvent {
    type: "WebSocketClosedEvent";
    code: number;
    byRemote: boolean;
    reason: string;
}
export interface PlayerUpdate {
    op: "playerUpdate";
    state: {
        position: number;
        time: number;
    };
    guildId: string;
}