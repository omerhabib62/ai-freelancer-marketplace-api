import { Injectable } from '@nestjs/common';

@Injectable()
export class BidsService {
  private bids = [];
  private idCounter = 1;

  findAll() {
    return this.bids;
  }

  findOne(id: number) {
    return this.bids.find((b) => b.id === id);
  }

  create(bid: any) {
    const newBid = { ...bid, id: this.idCounter++ };
    this.bids.push(newBid);
    return newBid;
  }

  update(id: number, update: any) {
    const idx = this.bids.findIndex((b) => b.id === id);
    if (idx === -1) return null;
    this.bids[idx] = { ...this.bids[idx], ...update };
    return this.bids[idx];
  }

  remove(id: number) {
    const idx = this.bids.findIndex((b) => b.id === id);
    if (idx === -1) return null;
    const removed = this.bids.splice(idx, 1);
    return removed[0];
  }
}
