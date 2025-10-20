import { Request, Response } from 'express';
import * as productService from './productService';
import { validationResult } from 'express-validator';
import { baseProductValidators } from './productValidation';

export const createProduct = [
  ...baseProductValidators,
  async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const seller = (req as any).seller;
    if (!seller || !seller._id) {
      return res.status(403).json({ error: 'Unauthorized!' });
    }

    if (!req.files || (req.files as any[]).length === 0) {
      return res.status(400).json({ error: 'At least one product image is required' });
    }

    if ((req.files as any[]).length > 4) {
      return res.status(400).json({ error: 'Maximum 4 images allowed' });
    }

    const product = await productService.createProduct(req.body, req.files as any[], seller._id);

    res.status(201).json({ message: 'Product created successfully', productId: product._id });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'SKU already exists' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Server error' });
  }
}];

export const getAllProducts = async (req: Request, res: Response) => {
  const seller = (req as any).seller;
  if (!seller || !seller._id) {
    return res.status(403).json({ error: 'Unauthorized!' });
  }
  const sellerId = seller._id;
  try {
    const products = await productService.getProductsBySeller(sellerId);
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAllProductsById = async (req: Request, res: Response) => {
  try {
    const { products } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: 'No products provided' });
    }

    const productIds = products.map((p: any) => p.productId || p.id);
    const formattedProducts = await productService.getProductsByIds(productIds, products);

    res.status(200).json({ products: formattedProducts });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAllProductsForShop = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20, category, priceRange, priceMin, priceMax, sortBy = 'newest' } = req.query;

    let parsedPriceMin = priceMin;
    let parsedPriceMax = priceMax;
    if (priceRange) {
      try {
        if (typeof priceRange === 'string' && priceRange.includes('-')) {
          const parts = priceRange.split('-').map((p) => p.trim());
          if (parts[0]) parsedPriceMin = parts[0];
          if (parts[1]) parsedPriceMax = parts[1];
        } else {
          const parsed = JSON.parse(priceRange as string);
          if (Array.isArray(parsed)) {
            parsedPriceMin = parsed[0];
            parsedPriceMax = parsed[1];
          }
        }
      } catch (err) {}
    }

    const filters = {
      category: category as string,
      priceMin: parsedPriceMin as string,
      priceMax: parsedPriceMax as string,
      sortBy: sortBy as string,
    };

    const pagination = { page: page as string, limit: limit as string };
    const customerId = (req as any).customer?._id;

    const result = await productService.getProductsForShop(filters, pagination, customerId);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getProductDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductDetails(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const searchProducts = async (req: Request, res: Response) => {
  if (!(req as any).seller && !(req as any).customer) {
    return res.status(403).json({ error: 'Unauthorized!' });
  }

  try {
    const { category, keyword } = req.query;

    if (!keyword || String(keyword).trim() === '') {
      return res.status(200).json({ products: [] });
    }

    const products = await productService.searchProducts(String(keyword), category as string);
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const sellerId = (req as any).seller?._id;

    if (!sellerId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const product = await productService.getSingleProduct(id, sellerId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const seller = (req as any).seller;
    const { _id: sellerId } = seller;
    const { id: productId } = req.params;

    if (!sellerId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const product = await productService.deleteProduct(productId, sellerId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found or not authorized' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId, retainedImageUrls } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: 'Product ID is required' });
    }

    const updateData = productService.formatProductForUpdate(req.body);

    let parsedRetainedUrls: string[] = [];
    if (retainedImageUrls) {
      try {
        parsedRetainedUrls = JSON.parse(retainedImageUrls);
      } catch (error) {}
    }

    const updatedProduct = await productService.updateProduct(productId, updateData, req.files as any[], parsedRetainedUrls);

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct,
      imageUpdateSummary: {
        totalImages: updatedProduct.productImages.length,
        newImagesAdded: (req.files as any[])?.length || 0,
        existingImagesRetained: updatedProduct.productImages.length - ((req.files as any[])?.length || 0),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred while updating the product' });
  }
};
