import { Schema, model } from "mongoose";
import { IGenericWishlist } from "./wishlist.interface";

const wishlistSchema = new Schema<IGenericWishlist>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    book: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: "book",
    },
  },
  {
    timestamps: true,
  }
);

const Wishlist = model<IGenericWishlist>("wishlist", wishlistSchema);

export const WishlistModel = { Wishlist };
