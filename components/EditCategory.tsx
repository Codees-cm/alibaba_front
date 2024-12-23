import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { useCategories } from '@/hooks/stock_manage/use-category';
import { X } from 'lucide-react';

export default function EditCategory({ id, initialData, onClose }) {
  const { modifyCategorie } = useCategories(false, id);
  
  // Available model classes that your ML model can detect
  const availableClasses = [
    'class1',
    'class2',
    'class3',
    'class4',
    'class5'
  ];

  // Initialize state with initialData, ensuring model_classes exists
  const [categoryData, setCategoryData] = useState({
    ...initialData,
    model_classes: initialData.model_classes || []
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
      console.log("Updating category:", categoryData);
      await modifyCategorie(categoryData);
      onClose();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <Card className="w-[400px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Edit Category</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
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
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </CardFooter>
      </form>
    </Card>
  );
}