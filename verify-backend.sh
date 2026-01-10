#!/bin/bash
# Image Upload - Backend Verification Script

echo "🔍 Image Upload Backend Verification"
echo "====================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
echo "1️⃣  Checking Node.js..."
if command -v node &> /dev/null; then
    node_version=$(node --version)
    echo -e "${GREEN}✓ Node.js installed: $node_version${NC}"
else
    echo -e "${RED}✗ Node.js not found${NC}"
    exit 1
fi

# Check if npm is installed
echo ""
echo "2️⃣  Checking npm..."
if command -v npm &> /dev/null; then
    npm_version=$(npm --version)
    echo -e "${GREEN}✓ npm installed: $npm_version${NC}"
else
    echo -e "${RED}✗ npm not found${NC}"
    exit 1
fi

# Check backend directory
echo ""
echo "3️⃣  Checking backend directory..."
if [ -d "backend" ]; then
    echo -e "${GREEN}✓ backend/ directory exists${NC}"
else
    echo -e "${RED}✗ backend/ directory not found${NC}"
    exit 1
fi

# Check package.json
echo ""
echo "4️⃣  Checking package.json..."
if [ -f "backend/package.json" ]; then
    echo -e "${GREEN}✓ backend/package.json exists${NC}"
    
    # Check for required dependencies
    echo "   Checking dependencies..."
    if grep -q "multer" backend/package.json; then
        echo -e "   ${GREEN}✓ multer found${NC}"
    else
        echo -e "   ${RED}✗ multer missing${NC}"
    fi
    
    if grep -q "sharp" backend/package.json; then
        echo -e "   ${GREEN}✓ sharp found${NC}"
    else
        echo -e "   ${RED}✗ sharp missing${NC}"
    fi
else
    echo -e "${RED}✗ backend/package.json not found${NC}"
    exit 1
fi

# Check node_modules
echo ""
echo "5️⃣  Checking backend/node_modules..."
if [ -d "backend/node_modules" ]; then
    echo -e "${GREEN}✓ node_modules/ exists${NC}"
    
    if [ -d "backend/node_modules/multer" ]; then
        echo -e "   ${GREEN}✓ multer module found${NC}"
    else
        echo -e "   ${YELLOW}⚠ multer module not found (run: npm install in backend)${NC}"
    fi
    
    if [ -d "backend/node_modules/sharp" ]; then
        echo -e "   ${GREEN}✓ sharp module found${NC}"
    else
        echo -e "   ${YELLOW}⚠ sharp module not found (run: npm install in backend)${NC}"
    fi
else
    echo -e "${YELLOW}⚠ node_modules/ not found (run: npm install in backend)${NC}"
fi

# Check backend/index.js
echo ""
echo "6️⃣  Checking backend/index.js..."
if [ -f "backend/index.js" ]; then
    echo -e "${GREEN}✓ backend/index.js exists${NC}"
    
    if grep -q "/api/admin/gallery/upload" backend/index.js; then
        echo -e "   ${GREEN}✓ Upload endpoint found${NC}"
    else
        echo -e "   ${RED}✗ Upload endpoint not found${NC}"
    fi
    
    if grep -q "multer" backend/index.js; then
        echo -e "   ${GREEN}✓ Multer import found${NC}"
    else
        echo -e "   ${RED}✗ Multer import not found${NC}"
    fi
else
    echo -e "${RED}✗ backend/index.js not found${NC}"
    exit 1
fi

# Check database.js
echo ""
echo "7️⃣  Checking backend/database.js..."
if [ -f "backend/database.js" ]; then
    echo -e "${GREEN}✓ backend/database.js exists${NC}"
    
    if grep -q "gallery_images" backend/database.js; then
        echo -e "   ${GREEN}✓ gallery_images table found${NC}"
    else
        echo -e "   ${RED}✗ gallery_images table not found${NC}"
    fi
    
    if grep -q "saveImage" backend/database.js; then
        echo -e "   ${GREEN}✓ saveImage function found${NC}"
    else
        echo -e "   ${RED}✗ saveImage function not found${NC}"
    fi
else
    echo -e "${RED}✗ backend/database.js not found${NC}"
    exit 1
fi

# Check uploads directory
echo ""
echo "8️⃣  Checking backend/uploads..."
if [ -d "backend/uploads" ]; then
    echo -e "${GREEN}✓ uploads/ directory exists${NC}"
    
    if [ -d "backend/uploads/images" ]; then
        echo -e "   ${GREEN}✓ uploads/images/ exists${NC}"
    else
        echo -e "   ${YELLOW}⚠ uploads/images/ not found (will be created on first upload)${NC}"
    fi
    
    if [ -d "backend/uploads/thumbnails" ]; then
        echo -e "   ${GREEN}✓ uploads/thumbnails/ exists${NC}"
    else
        echo -e "   ${YELLOW}⚠ uploads/thumbnails/ not found (will be created on first upload)${NC}"
    fi
else
    echo -e "${YELLOW}⚠ uploads/ directory not found (will be created on first upload)${NC}"
fi

# Check frontend
echo ""
echo "9️⃣  Checking frontend components..."
if [ -f "frontend/src/components/ImageGallery.jsx" ]; then
    echo -e "${GREEN}✓ ImageGallery.jsx exists${NC}"
else
    echo -e "${RED}✗ ImageGallery.jsx not found${NC}"
fi

if [ -f "frontend/src/components/ImageGalleryAdmin.jsx" ]; then
    echo -e "${GREEN}✓ ImageGalleryAdmin.jsx exists${NC}"
else
    echo -e "${RED}✗ ImageGalleryAdmin.jsx not found${NC}"
fi

# Summary
echo ""
echo "====================================="
echo "✅ Backend Verification Complete"
echo ""
echo "📝 Next Steps:"
echo "  1. If needed dependencies are missing, run:"
echo "     cd backend && npm install"
echo ""
echo "  2. Start the backend server:"
echo "     cd backend && npm start"
echo ""
echo "  3. In another terminal, start frontend:"
echo "     cd frontend && npm run dev"
echo ""
echo "  4. Visit http://localhost:5173"
echo "  5. Click 'Admin' and try uploading images"
echo ""
echo "🔗 More help: See QUICK_START_IMAGES.md"
echo "====================================="
