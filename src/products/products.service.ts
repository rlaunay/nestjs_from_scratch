import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  private async findProduct(id: string) {
    let product: Product;
    try {
      product = await this.productModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not find product');
    }
    if (!product) {
      throw new NotFoundException('Could not find product');
    }
    return product;
  }

  async getProducts() {
    const result = await this.productModel.find().exec();
    return result.map((prod: Product) => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
    }));
  }

  async getOneProduct(prodId: string) {
    const product = await this.findProduct(prodId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async insertProduct(
    title: string,
    desc: string,
    price: number,
  ): Promise<string> {
    const newProduct = new this.productModel({
      title,
      description: desc,
      price,
    });
    const result = await newProduct.save();
    return result.id;
  }

  async updateProduct(
    prodId: string,
    title: string,
    desc: string,
    price: number,
  ) {
    const updatedProduct = await this.findProduct(prodId);
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    const result = await updatedProduct.save();
    return {
      id: result.id,
      title: result.title,
      description: result.description,
      price: result.price,
    };
  }

  async deleteProduct(prodId: string) {
    try {
      const result = await this.productModel.deleteOne({ _id: prodId }).exec();
      if (result.n === 0) {
        throw new NotFoundException('Could not find product');
      }
    } catch (error) {
      throw new NotFoundException('Could not find product');
    }
  }
}
