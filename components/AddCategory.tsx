"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { useCategories } from '@/hooks/stock_manage/use-category';

export default function AddCategory() {
  const { addCategorie } = useCategories();
  
  // Available model classes that your ML model can detect
  const availableClasses = [
    'Capacitor',
    'Diode',
    'IC',
    'Inductor',
    'Resistor',
    'Transformer'
  ];

  const [categoryData, setCategoryData] = useState({
    name: "",
    model_classes: []
  });

  // Function to handle input change for name
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCategoryData({ ...categoryData, [id]: value });
  };

  // Function to handle checkbox changes for model classes
  const handleClassToggle = (className) => {
    setCategoryData(prev => {
      const currentClasses = prev.model_classes;
      const newClasses = currentClasses.includes(className)
        ? currentClasses.filter(c => c !== className)
        : [...currentClasses, className];
      
      return {
        ...prev,
        model_classes: newClasses
      };
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting category:", categoryData);
      await addCategorie(categoryData);
      // Reset form after successful submission
      setCategoryData({
        name: "",
        model_classes: []
      });
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Add Category</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-6">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Category Name</Label>
              <Input 
                id="name"
                value={categoryData.name}
                onChange={handleInputChange}
                placeholder="Enter Category Name"
              />
            </div>
            
            <div className="flex flex-col space-y-1.5">
              <Label>Detectable Objects</Label>
              <div className="grid grid-cols-2 gap-4">
                {availableClasses.map((className) => (
                  <div key={className} className="flex items-center space-x-2">
                    <Checkbox
                      id={`class-${className}`}
                      checked={categoryData.model_classes.includes(className)}
                      onCheckedChange={() => handleClassToggle(className)}
                    />
                    <label 
                      htmlFor={`class-${className}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {className}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => setCategoryData({ name: "", model_classes: [] })}
          >
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </CardFooter>
      </form>
    </Card>
  );
}