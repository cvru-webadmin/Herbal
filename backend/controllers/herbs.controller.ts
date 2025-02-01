import { type Request, type Response } from "express";
import { Herbs } from "../database/herb.model";
import ApiError from "../utility/apiError";
import s3helper from "../utility/s3helper";
import mongoose from "mongoose";

export const getHerbs = async (req: Request, res: Response) => {
  if (!req.session.userSession) {
    throw new ApiError(
      401,
      "Please loging first",
      "You are not authenticated. Please login first!"
    );
  } else {
    const { name, synonyms, uses, page = 1, pageSize = 10 } = req.query;
    const searchQuery: any = {};

    const nameArray = name ? (Array.isArray(name) ? name : [name]) : [];
    const synonymsArray = synonyms
      ? Array.isArray(synonyms)
        ? synonyms
        : [synonyms]
      : [];
    const usesArray = uses ? (Array.isArray(uses) ? uses : [uses]) : [];

    // Combine all search terms into a single array
    const allSearchTerms = [
      ...new Set([...nameArray, ...synonymsArray, ...usesArray]),
    ];

    // Create a search query with $or to match across all fields
    if (allSearchTerms.length > 0) {
      searchQuery.$or = allSearchTerms.map((term) => ({
        $or: [
          { name: { $regex: term, $options: "i" } },
          // @ts-ignore
          { synonyms: { $in: [new RegExp(term, "i")] } },
          // @ts-ignore
          { uses: { $in: [new RegExp(term, "i")] } },
        ],
      }));
    }

    const skip = (Number(page) - 1) * Number(pageSize);
    const limit = Number(pageSize);

    // Fetch total count and herbs data
    const totalCount = await Herbs.countDocuments(searchQuery);
    const herbs = await Herbs.find(searchQuery).skip(skip).limit(limit);

    // Return response
    res.status(200).json({
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: Number(page),
      herbs,
    });
  }
};

export const addHerbs = async (req: Request, res: Response) => {
  if (!req.session.userSession) {
    throw new ApiError(
      401,
      "Please loging first",
      "You are not authenticated. Please login first!"
    );
  } else {
    let thumbnail: string | undefined = req.body.thumbnail;

    // If no thumbnail in req.body and a file is provided, upload it to the cloud
    if (!thumbnail && req.file) {
      const { path, filename } = req.file;
      thumbnail = await s3helper.uploadToCloud({
        filePath: path,
        fileName: filename,
      });
    }

    // Destructure fields from req.body
    let {
      _id,
      name,
      synonyms,
      biologicalSource,
      geographicalSource,
      cultivationAndCollection,
      chemicalConstituents,
      uses,
      description,
      macroScopiccharacters,
      otherDetails,
    } = req.body;

    // Parse fields that are expected to be JSON strings
    if (synonyms) {
      synonyms = JSON.parse(synonyms);
    }
    if (uses) {
      uses = JSON.parse(uses);
    }
    if (macroScopiccharacters) {
      macroScopiccharacters = JSON.parse(macroScopiccharacters);
    }

    // Validate that macroScopiccharacters is an object (if provided)
    if (
      macroScopiccharacters &&
      (typeof macroScopiccharacters !== "object" ||
        macroScopiccharacters === null)
    ) {
      res.status(400).json({
        message: "Invalid macroScopiccharacters format. Expected an object.",
      });
    }

    // Determine if we are updating an existing herb or creating a new one
    if (_id) {
      // Update logic: Find the herb by _id and update the provided fields
      const herbToUpdate = await Herbs.findOne({
        _id,
      });
      if (!herbToUpdate) {
        res.status(404).json({ message: "Herb not found" });
      } else {
        // Update fields if provided
        if (name) herbToUpdate.name = name;
        if (thumbnail) herbToUpdate.thumbnail = thumbnail;
        if (synonyms) herbToUpdate.synonyms = synonyms;
        if (biologicalSource) herbToUpdate.biologicalSource = biologicalSource;
        if (geographicalSource)
          herbToUpdate.geographicalSource = geographicalSource;
        if (cultivationAndCollection)
          herbToUpdate.cultivationAndCollection = cultivationAndCollection;
        if (chemicalConstituents)
          herbToUpdate.chemicalConstituents = chemicalConstituents;
        if (uses) herbToUpdate.uses = uses;
        if (description) herbToUpdate.description = description;
        if (macroScopiccharacters)
          herbToUpdate.macroScopiccharacters = macroScopiccharacters;
        if (otherDetails) herbToUpdate.otherDetails = otherDetails;

        await herbToUpdate.save();
        res.status(200).json({ message: "Herb updated successfully" });
      }
    } else {
      // Create new herb logic
      const newHerb = new Herbs({
        name,
        thumbnail, // This will either come from req.body or from the cloud upload
        synonyms,
        biologicalSource,
        geographicalSource,
        cultivationAndCollection,
        chemicalConstituents,
        uses,
        description,
        auther: req.session.userSession,
        macroScopiccharacters,
        otherDetails,
      });

      await newHerb.save();
      res
        .status(201)
        .json({ message: "Herb added successfully", _id: newHerb._id });
    }
  }
};

export const getHerb = async (req: Request, res: Response) => {
  if (!req.session.userSession) {
    throw new ApiError(
      401,
      "Please loging first",
      "You are not authenticated. Please login first!"
    );
  } else {
    const { id } = req.params;

    // Validate the herb id
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ message: "Invalid herb id" });
    }

    const herbAggregation = await Herbs.aggregate([
      // Match the herb document with the given _id
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      // Perform a lookup to join with the users collection
      {
        $lookup: {
          from: "users", // The collection name for users (adjust if necessary)
          localField: "auther", // Field in Herbs that references the user id
          foreignField: "_id", // Field in users collection to match against
          as: "authorDetails", // The resulting array field containing matched user(s)
        },
      },
      // Optionally, unwind the authorDetails array (if you expect only one user)
      {
        $unwind: {
          path: "$authorDetails",
          preserveNullAndEmptyArrays: true, // In case there is no matching user
        },
      },
      {
        $project: {
          name: 1,
          thumbnail: 1,
          synonyms: 1,
          biologicalSource: 1,
          geographicalSource: 1,
          cultivationAndCollection: 1,
          chemicalConstituents: 1,
          uses: 1,
          description: 1,
          macroScopiccharacters: 1,
          otherDetails: 1,
          "authorDetails.email": 1,
          "authorDetails.name": 1,
        },
      },
    ]);

    // If no herb is found, return a 404 response
    if (!herbAggregation || herbAggregation.length === 0) {
      res.status(404).json({ message: "Herb not found" });
    }
    // Return the first (and only) result from the aggregation
    res.status(200).json(herbAggregation[0]);
  }
};

export const deleteHerb = async (req: Request, res: Response) => {
  if (!req.session.userSession) {
    throw new ApiError(
      401,
      "Please loging first",
      "You are not authenticated. Please login first!"
    );
  } else {
    const { id } = req.params;

    // Validate the herb id
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ message: "Invalid herb id" });
    }

    // Find the herb by id and delete it
    const deletedHerb = await Herbs.findByIdAndDelete(id);

    // If no herb is found, return a 404 response
    if (!deletedHerb) {
      res.status(404).json({ message: "Herb not found" });
    }

    res.status(200).json({ message: "Herb deleted successfully" });
  }
};
